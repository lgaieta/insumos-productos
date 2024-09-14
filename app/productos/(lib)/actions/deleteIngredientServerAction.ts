'use server';

import Ingredient from '@common/entities/Ingredient';
import Product from '@common/entities/Product';
import { deleteIngredientFromDatabase } from '@productos/(lib)/services/deleteIngredientFromDatabase';
import { revalidatePath } from 'next/cache';

export async function deleteIngredientServerAction(
    ingredientId: Ingredient['id'],
    productId: Product['id'],
) {
    await deleteIngredientFromDatabase(ingredientId);

    revalidatePath(`/productos/detalles/${productId}`);

    console.log(`Deleted ingredient ${ingredientId} successfully`);
}
