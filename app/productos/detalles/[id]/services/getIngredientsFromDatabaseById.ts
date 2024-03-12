import { pool } from '@common/services/pool';
import { DBProduct } from '@productos/api/services/getProductsListFromDatabase';
import { RowDataPacket } from 'mysql2';

export interface DBIngredient extends RowDataPacket {
    FORMULA_DETALLE_ID: number;
    PRODUCTO_ID: number;
    INSUMO_ID: number | null;
    SUBPRODUCTO_ID: number | null;
    CANTIDAD: string;
}

export const getIngredientsFromDatabaseById = async (productId: DBProduct['PRODUCTO_ID']) => {
    const result = await pool.query<DBIngredient[]>(
        'SELECT * FROM FORMULA_DETALLE WHERE PRODUCTO_ID = ?',
        [productId],
    );

    return result[0];
};
