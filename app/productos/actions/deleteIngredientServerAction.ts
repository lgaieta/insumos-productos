'use server';

import Ingredient from '@common/entities/Ingredient';
import { deleteIngredientFromDatabase } from '@productos/services/deleteIngredientFromDatabase';

export async function deleteIngredientServerAction(ingredientId: Ingredient['id']) {
    await deleteIngredientFromDatabase(ingredientId);

    console.log(`Deleted ingredient ${ingredientId} successfully`);
}
