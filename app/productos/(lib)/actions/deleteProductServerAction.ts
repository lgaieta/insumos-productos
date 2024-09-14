'use server';

import Product from '@common/entities/Product';
import { deleteProductAdapter } from '@productos/adapters/deleteProductAdapter';
import { deleteProductFromDatabase } from '@productos/services/deleteProductFromDatabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteProductServerAction(
    productId: Product['id'],
    _: any,
    _formData: FormData,
) {
    'use server';
    try {
        await deleteProductFromDatabase(deleteProductAdapter(productId));

        revalidatePath(`/productos`);

        console.log('Deleted product with id ' + productId + ' successfully');
    } catch (e) {
        return {
            errors: {
                server: 'Ha ocurrido un error al editar los datos, por favor inténtelo nuevamente.',
            },
        };
    }

    redirect('/productos');
}
