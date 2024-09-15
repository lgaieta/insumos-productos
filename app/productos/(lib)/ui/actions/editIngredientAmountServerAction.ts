'use server';

import Ingredient from '@common/entities/Ingredient';
import Product from '@common/entities/Product';
import { editIngredientAmountAdapter } from '@productos/(lib)/adapters/editIngredientAmountAdapter';
import { updateIngredientAmountInDatabase } from '@productos/(lib)/services/updateIngredientAmountInDatabase';
import { revalidatePath } from 'next/cache';
import { updateProductPriceFromDatabase } from '../../services/updateProductPriceFromDatabase';

type Params = {
    newAmount: Ingredient['amount'];
    ingredientId: Ingredient['id'];
    productId: Product['id'];
};

export async function editIngredientAmountServerAction(params: Params) {
    const { newAmount, ingredientId, productId } = params;

    try {
        const adaptedAmount = editIngredientAmountAdapter(newAmount);

        await updateIngredientAmountInDatabase(adaptedAmount, ingredientId);

        await updateProductPriceFromDatabase(productId);

        console.log(`Updated ingredient ${ingredientId} successfully`);
    } catch (e) {
        return { error: 'true' };
    }
    revalidatePath(`/productos/detalles/${productId}`);
}
