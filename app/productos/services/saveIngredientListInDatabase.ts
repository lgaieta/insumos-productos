import { pool } from '@common/services/pool';
import { DBIngredient } from '@productos/services/getIngredientsFromDatabaseById';

export type NewDBIngredient = [
    DBIngredient['PRODUCTO_ID'],
    DBIngredient['INSUMO_ID'],
    DBIngredient['SUBPRODUCTO_ID'],
];

export const saveIngredientListInDatabase = async (list: NewDBIngredient[]) => {
    return await pool.query(
        'INSERT INTO FORMULA_DETALLE (PRODUCTO_ID, INSUMO_ID, SUBPRODUCTO_ID) VALUES ? ',
        [list],
    );
};
