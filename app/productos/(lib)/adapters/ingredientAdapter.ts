import Ingredient from '@common/entities/Ingredient';
import { DBIngredient } from '@productos/(lib)/services/getIngredientsFromDatabaseById';

export const ingredientAdapter = (incomingIngredient: DBIngredient): Ingredient => {
    const isMaterialIngredient = incomingIngredient.TIPO_INGREDIENTE === 'insumo';

    return {
        id: incomingIngredient.FORMULA_DETALLE_ID,
        productId: incomingIngredient.PRODUCTO_ID,
        componentId: incomingIngredient.INGREDIENTE_ID,
        componentName: isMaterialIngredient
            ? incomingIngredient.INSUMO_NOMBRE!
            : incomingIngredient.SUBPRODUCTO_NOMBRE!,
        type: isMaterialIngredient ? 'material' : 'product',
        unitPrice: isMaterialIngredient
            ? incomingIngredient.INSUMO_COSTO
            : incomingIngredient.SUBPRODUCTO_COSTO,
        amount: parseFloat(incomingIngredient.CANTIDAD),
    };
};

export const ingredientsListAdapter = (ingredientsList: DBIngredient[]) =>
    ingredientsList.map(ingredientAdapter);
