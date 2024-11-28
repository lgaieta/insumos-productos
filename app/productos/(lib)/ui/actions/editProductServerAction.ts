'use server';

import Product from '@common/entities/Product';
import { accumulateFormErrors } from '@common/utils/accumulateFormErrors';
import { ProductValidationSchema } from '@productos/(lib)/services/schemas/ProductValidationSchema';
import { ProductDetailsFormErrors } from '@productos/(lib)/ui/components/product-details/ProductDetails';
import { getEditedProductFromFormData } from '@productos/(lib)/utils/getEditedProductFromFormData';
import { revalidatePath } from 'next/cache';
import MySQLProductRepository from '@productos/(lib)/services/MySQLProductRepository';
import UpdateProduct from '@productos/(lib)/usecases/UpdateProduct';
import MySQLIngredientRepository from '@productos/(lib)/services/MySQLIngredientRepository';
import ProductPriceType from '@common/entities/ProductPriceType';
import UpdateSuperProductsPrice from '@productos/(lib)/usecases/UpdateSuperProductsPrice';

export async function editProductServerAction(
    currentProduct: Product,
    _: { errors: ProductDetailsFormErrors },
    formData: FormData,
) {
    try {
        const editedProduct = await getEditedProductFromFormData(formData);
        const parsedResult = ProductValidationSchema.safeParse({
            ...editedProduct,
            profit: editedProduct.profit || 0,
        });

        if (parsedResult.success === false) {
            return accumulateFormErrors(parsedResult);
        }

        const productRepository = new MySQLProductRepository();
        const ingredientRepository = new MySQLIngredientRepository();

        const validatedProduct = {
            ...currentProduct,
            ...parsedResult.data,
        };

        const { success } = await new UpdateProduct().execute({
            newProduct: validatedProduct,
            productRepository,
            ingredientRepository,
        });

        if (!success)
            return {
                errors: {
                    server: 'Ha ocurrido un error al editar los datos, por favor inténtelo nuevamente.',
                },
            };

        const { success: recalculateProductSuccess } = await new UpdateSuperProductsPrice().execute(
            {
                product: validatedProduct,
                productRepository,
                ingredientRepository,
            },
        );

        if (!recalculateProductSuccess) {
            return {
                errors: {
                    server: 'Ha ocurrido un error al editar los datos, por favor inténtelo nuevamente.',
                },
            };
        }

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
