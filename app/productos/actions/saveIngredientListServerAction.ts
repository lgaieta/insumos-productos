'use server';

import Ingredient from '@common/entities/Ingredient';

export type NewIngredientList = {
    productId: Ingredient['productId'];
    materialList: Ingredient<'material'>['componentId'][];
    subproductList: Ingredient<'product'>['componentId'][];
};

export async function saveIngredientListServerAction(newIngredientList: NewIngredientList) {
    console.log(newIngredientList);
}
