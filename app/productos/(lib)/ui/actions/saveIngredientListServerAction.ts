'use server';

import type NewIngredientsList from '@common/entities/NewIngredientsList';
import MySQLIngredientRepository from '@productos/(lib)/services/MySQLIngredientRepository';
import SaveIngredientsList from '@productos/(lib)/usecases/SaveIngredientsList';
import { revalidatePath } from 'next/cache';

export async function saveIngredientListServerAction(newIngredientsList: NewIngredientsList) {
    const ingredientRepository = new MySQLIngredientRepository();

    const { success } = await SaveIngredientsList.execute({
        newIngredientsList,
        ingredientRepository,
    });

    if (!success) return;

    revalidatePath(`/productos/detalles/${newIngredientsList.productId}`);
}
