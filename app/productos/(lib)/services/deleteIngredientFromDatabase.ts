import { pool } from '@common/services/pool';
import { DBIngredient } from '@productos/(lib)/services/getIngredientsFromDatabaseById';

export const deleteIngredientFromDatabase = async (id: DBIngredient['FORMULA_DETALLE_ID']) => {
    await pool.query('DELETE FROM FORMULA_DETALLE WHERE FORMULA_DETALLE_ID = ?', [id]);
};
