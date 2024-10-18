'use server';

import Product from '@common/entities/Product';
import { accumulateFormErrors } from '@common/utils/accumulateFormErrors';
import { ProductValidationSchema } from '@productos/(lib)/services/schemas/ProductValidationSchema';
import { ProductDetailsFormErrors } from '@productos/detalles/[id]/components/product-details/ProductDetails';
import { getEditedProductFromFormData } from '@productos/(lib)/utils/getEditedProductFromFormData';
import { revalidatePath } from 'next/cache';
import MySQLProductRepository from '@productos/(lib)/services/MySQLProductRepository';
import UpdateProduct from '@productos/(lib)/usecases/UpdateProduct';
import MySQLIngredientRepository from '@productos/(lib)/services/MySQLIngredientRepository';
import ProductPriceType from '@common/entities/ProductPriceType';

export async function editProductServerAction(
    currentProduct: Product,
    _: { errors: ProductDetailsFormErrors },
    formData: FormData,
) {
    'use server';
    try {
        const editedProduct = getEditedProductFromFormData(formData);
        const parsedResult = ProductValidationSchema.safeParse(editedProduct);

        if (parsedResult.success === false) {
            return accumulateFormErrors(parsedResult);
        }

        const { success } = await new UpdateProduct().execute({
            newProduct: {
                id: currentProduct.id,
                ...parsedResult.data,
                priceType: ProductPriceType.Fixed,
            },
            productRepository: new MySQLProductRepository(),
            ingredientRepository: new MySQLIngredientRepository(),
        });

        if (!success)
            return {
                errors: {
                    server: 'Ha ocurrido un error al editar los datos, por favor inténtelo nuevamente.',
                },
            };

        revalidatePath(`/producto/detalles/${currentProduct.id}`);

        console.log('Updated product with id ' + currentProduct.id + ' successfully');

        return { errors: {} };
    } catch (e) {
        return {
            errors: {
                server: 'Ha ocurrido un error al editar los datos, por favor inténtelo nuevamente.',
            },
        };
    }
}
