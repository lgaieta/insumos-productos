import { pool } from '@common/services/pool';
import { DBIngredient } from '@productos/(lib)/services/getIngredientsFromDatabaseById';

export const updateIngredientAmountInDatabase = async (
    amount: number,
    ingredientId: DBIngredient['FORMULA_DETALLE_ID'],
) => {
    await pool.query('UPDATE FORMULA_DETALLE SET CANTIDAD = ? WHERE FORMULA_DETALLE_ID = ?', [
        amount,
        ingredientId,
    ]);
};
