import { pool } from '@common/services/pool';
import { DBProduct } from '@productos/services/getProductListFromDatabase';
import { RowDataPacket } from 'mysql2';

export interface DBIngredient extends RowDataPacket {
    FORMULA_DETALLE_ID: number;
    PRODUCTO_ID: number;
    INSUMO_ID: number | null;
    INSUMO_NOMBRE: string | null;
    SUBPRODUCTO_ID: number | null;
    SUBPRODUCTO_NOMBRE: string | null;
    CANTIDAD: string;
}

export const getIngredientsFromDatabaseById = async (productId: DBProduct['PRODUCTO_ID']) => {
    const result = await pool.query<DBIngredient[]>(
        `
        SELECT F.*, I.NOMBRE AS 'INSUMO_NOMBRE', SP.NOMBRE AS 'SUBPRODUCTO_NOMBRE'
        FROM FORMULA_DETALLE F
        LEFT JOIN INSUMO I ON F.INSUMO_ID = I.INSUMO_ID
        LEFT JOIN PRODUCTO SP ON F.SUBPRODUCTO_ID = SP.PRODUCTO_ID
        WHERE F.PRODUCTO_ID = ?
        `,
        [productId],
    );

    return result[0];
};
