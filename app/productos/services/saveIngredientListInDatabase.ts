import { pool } from '@common/services/pool';
import { DBIngredient } from '@productos/services/getIngredientsFromDatabaseById';

export type NewDBIngredient = [
    productId: DBIngredient['PRODUCTO_ID'],
    componentId: DBIngredient['INGREDIENTE_ID'],
    type: DBIngredient['TIPO_INGREDIENTE'],
];

export const saveIngredientListInDatabase = async (list: NewDBIngredient[]) => {
    return await pool.query(
        'INSERT IGNORE INTO FORMULA_DETALLE (PRODUCTO_ID, INGREDIENTE_ID, TIPO_INGREDIENTE) VALUES ? ',
        [list],
    );
};
