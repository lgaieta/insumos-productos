'use server';

import Ingredient from '@common/entities/Ingredient';
import { saveIngredientListAdapter } from '@productos/adapters/saveIngredientListAdapter';
import { saveIngredientListInDatabase } from '@productos/services/saveIngredientListInDatabase';
import { revalidatePath } from 'next/cache';

export type NewIngredientList = {
    productId: Ingredient['productId'];
    materialList: Ingredient<'material'>['componentId'][];
    subproductList: Ingredient<'product'>['componentId'][];
};

export async function saveIngredientListServerAction(newIngredientList: NewIngredientList) {
    const adaptedList = saveIngredientListAdapter(newIngredientList);

    await saveIngredientListInDatabase(adaptedList);

    console.log(`Saved ${adaptedList.length} ingredients successfully`);

    revalidatePath(`/productos/detalles/${newIngredientList.productId}`);
}
