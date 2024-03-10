'use server';

import Product from '@common/entities/Product';
import { accumulateFormErrors } from '@common/utils/accumulateFormErrors';
import { ProductValidationSchema } from '@productos-nuevo/schemas/ProductValidationSchema';
import { updateProductAdapter } from '@productos/detalles/[id]/adapters/updateProductAdapter';
import { ProductDetailsFormErrors } from '@productos-detalles/components/ProductDetails';
import { updateProductFromDatabase } from '@productos-detalles/services/updateProductFromDatabase';
import { getEditedProductFromFormData } from '@productos-detalles/utils/getEditedProductFromFormData';
import { revalidatePath } from 'next/cache';

export async function editProductServerAction(
    productId: Product['id'],
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

        await updateProductFromDatabase(
            await updateProductAdapter({ ...parsedResult.data, id: productId }),
        );

        revalidatePath(`/producto/detalles/${productId}`);

        console.log('Updated product with id ' + productId + ' successfully');

        return { errors: {} };
    } catch (e) {
        return {
            errors: {
                server: 'Ha ocurrido un error al editar los datos, por favor inténtelo nuevamente.',
            },
        };
    }
}
