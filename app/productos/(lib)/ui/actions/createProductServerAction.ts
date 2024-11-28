'use server';

import { redirect } from 'next/navigation';
import { ProductValidationSchema } from '@productos/(lib)/services/schemas/ProductValidationSchema';
import { accumulateFormErrors } from '@common/utils/accumulateFormErrors';
import CreateProduct from '@productos/(lib)/usecases/CreateProduct';
import MySQLProductRepository from '@productos/(lib)/services/MySQLProductRepository';
import ProductPriceType from '@common/entities/ProductPriceType';
import type Ingredient from '@common/entities/Ingredient';
import MySQLIngredientRepository from '@productos/(lib)/services/MySQLIngredientRepository';
import IngredientType from '@common/entities/IngredientType';
import type NewIngredientsList from '@common/entities/NewIngredientsList';

export const createProductServerAction = async (
    _: any,
    formData: FormData,
    ingredients?: Ingredient[],
) => {
    try {
        const name = formData.get('name') as string;
        const file = formData.get('image') as Blob;
        const price = parseFloat(formData.get('price') as string);
        const profit = parseFloat(formData.get('profit') as string) || 0;
        const priceType = formData.get('priceType') as string;
        const link = (formData.get('link') as string) || null;

        console.log(priceType);

        const parsedResult = ProductValidationSchema.safeParse({
            name,
            image: file.size === 0 ? null : file,
            price,
            link,
            profit,
            priceType,
        });

        if (parsedResult.success === false) {
            return accumulateFormErrors(parsedResult);
        }

        const productId = await CreateProduct.execute({
            newProduct: {
                id: 1,
                ...parsedResult.data,
                priceType:
                    (!ingredients || ingredients.length < 1) &&
                    parsedResult.data.priceType === ProductPriceType.Fixed
                        ? ProductPriceType.Fixed
                        : ProductPriceType.Dynamic,
            },
            productRepository: new MySQLProductRepository(),
        });

        const ingredientRepository = new MySQLIngredientRepository();
        if (ingredients)
            await ingredientRepository.saveList(
                ingredients.reduce(
                    (acc: NewIngredientsList, el) => {
                        if (el.type === IngredientType.Material)
                            return {
                                ...acc,
                                materialList: [...acc.materialList, [el.componentId, el.amount]],
                            };
                        else
                            return {
                                ...acc,
                                subproductList: [
                                    ...acc.subproductList,
                                    [el.componentId, el.amount],
                                ],
                            };
                    },
                    { productId, materialList: [], subproductList: [] },
                ),
            );

        console.log(`Saved product with name ${name} and price ${price} successfully`);
    } catch (e) {
        console.log(e);

        return {
            errors: {
                server: 'Ha ocurrido un error al guardar los datos, por favor inténtelo nuevamente.',
            },
        };
    }

    redirect('/productos');
};
