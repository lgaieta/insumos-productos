'use server';

import Product from '@common/entities/Product';
import MySQLIngredientRepository from '@productos/(lib)/services/MySQLIngredientRepository';
import MySQLProductRepository from '@productos/(lib)/services/MySQLProductRepository';
import DeleteProduct from '@productos/(lib)/usecases/DeleteProduct';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteProductServerAction(
    productId: Product['id'],
    _: any,
    _formData: FormData,
) {
    try {
        const { success } = await DeleteProduct.execute({
            productId,
            productRepository: new MySQLProductRepository(),
            ingredientRepository: new MySQLIngredientRepository(),
        });

        if (!success) {
            return {
                errors: {
                    server: 'Ha ocurrido un error al borrar los datos, por favor reintente nuevamente.',
                },
            };
        }

        revalidatePath(`/productos`);

        console.log('Deleted product with id ' + productId + ' successfully');
    } catch (e) {
        return {
            errors: {
                server: 'Ha ocurrido un error al borrar los datos, por favor inténtelo nuevamente.',
            },
        };
    }

    redirect('/productos');
}
