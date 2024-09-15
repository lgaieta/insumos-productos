'use server';

import Ingredient from '@common/entities/Ingredient';
import Product from '@common/entities/Product';
import { deleteIngredientFromDatabase } from '@productos/(lib)/services/deleteIngredientFromDatabase';
import { revalidatePath } from 'next/cache';
import { updateProductPriceFromDatabase } from '../../services/updateProductPriceFromDatabase';
import type IngredientRepository from '@common/entities/IngredientRepository';
import MySQLIngredientRepository from '@productos/(lib)/services/MySQLIngredientRepository';
import type ProductRepository from '@common/entities/ProductRepository';
import MySQLProductRepository from '@productos/(lib)/services/MySQLProductRepository';
import DeleteIngredient from '@productos/(lib)/usecases/DeleteIngredient';

export async function deleteIngredientServerAction(
    ingredientId: Ingredient['id'],
    productId: Product['id'],
) {
    const ingredientRepository: IngredientRepository = new MySQLIngredientRepository();
    const productRepository: ProductRepository = new MySQLProductRepository();

    try {
        const { success } = await DeleteIngredient.execute({
            ingredientId,
            productId,
            ingredientRepository,
            productRepository,
        });

        if (!success) {
            return { error: 'true' };
        }

        revalidatePath(`/productos/detalles/${productId}`);

        console.log(`Deleted ingredient ${ingredientId} successfully`);
    } catch (e) {
        console.error(`Error deleting ingredient ${ingredientId}`, e);
        return { error: 'true' };
    }
}
