'use server';

import Ingredient from '@common/entities/Ingredient';
import Product from '@common/entities/Product';
import { editIngredientAmountAdapter } from '@productos/adapters/editIngredientAmountAdapter';
import { updateIngredientAmountInDatabase } from '@productos/services/updateIngredientAmountInDatabase';
import { revalidatePath } from 'next/cache';

type Params = {
    newAmount: Ingredient['amount'];
    ingredientId: Ingredient['id'];
    productId: Product['id'];
};

export async function editIngredientAmountServerAction(params: Params) {
    const { newAmount, ingredientId, productId } = params;

    const adaptedAmount = editIngredientAmountAdapter(newAmount);

    await updateIngredientAmountInDatabase(adaptedAmount, ingredientId);

    console.log(`Updated ingredient ${ingredientId} successfully`);

    revalidatePath(`/productos/detalles/${productId}`);
}
