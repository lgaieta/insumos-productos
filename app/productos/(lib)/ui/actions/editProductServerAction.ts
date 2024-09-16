'use server';

import Product from '@common/entities/Product';
import { accumulateFormErrors } from '@common/utils/accumulateFormErrors';
import { ProductValidationSchema } from '@productos/(lib)/services/schemas/ProductValidationSchema';
import { updateProductAdapter } from '@productos/(lib)/adapters/updateProductAdapter';
import { ProductDetailsFormErrors } from '@productos/detalles/[id]/components/product-details/ProductDetails';
import { updateProductFromDatabase } from '@productos/(lib)/services/updateProductFromDatabase';
import { getEditedProductFromFormData } from '@productos/(lib)/utils/getEditedProductFromFormData';
import { revalidatePath } from 'next/cache';
import MySQLProductRepository from '@productos/(lib)/services/MySQLProductRepository';
import type ProductRepository from '@common/entities/ProductRepository';
import UpdateProduct from '@productos/(lib)/usecases/UpdateProduct';

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

        const productRepository: ProductRepository = new MySQLProductRepository();

        const { success } = await UpdateProduct.execute({
            newProduct: { id: currentProduct.id, ...parsedResult.data },
            currentProduct: currentProduct,
            productRepository,
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
