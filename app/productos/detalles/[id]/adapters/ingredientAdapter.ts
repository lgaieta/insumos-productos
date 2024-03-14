import Ingredient, { IngredientType } from '@common/entities/Ingredient';
import { DBIngredient } from '../services/getIngredientsFromDatabaseById';

export const ingredientAdapter = (incomingIngredient: DBIngredient): Ingredient<IngredientType> => {
    return {
        id: incomingIngredient.FORMULA_DETALLE_ID,
        productId: incomingIngredient.PRODUCTO_ID,
        componentId: incomingIngredient.INSUMO_ID ?? incomingIngredient.SUBPRODUCTO_ID!,
        componentName: incomingIngredient.INSUMO_NOMBRE ?? incomingIngredient.SUBPRODUCTO_NOMBRE!,
        type: incomingIngredient.INSUMO_ID !== null ? 'material' : 'product',
        amount: parseFloat(incomingIngredient.CANTIDAD),
    };
};

export const ingredientsListAdapter = (ingredientsList: DBIngredient[]) =>
    ingredientsList.map(ingredientAdapter);
