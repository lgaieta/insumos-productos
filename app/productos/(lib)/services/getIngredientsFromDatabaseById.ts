import { pool } from '@common/services/pool';
import { DBProduct } from '@productos/services/getProductListFromDatabase';
import { RowDataPacket } from 'mysql2';

export interface DBIngredient extends RowDataPacket {
    FORMULA_DETALLE_ID: number;
    PRODUCTO_ID: number;
    INGREDIENTE_ID: number;
    TIPO_INGREDIENTE: string;
    CANTIDAD: string;
    INSUMO_NOMBRE: string | null;
    SUBPRODUCTO_NOMBRE: string | null;
}

export const getIngredientsFromDatabaseById = async (productId: DBProduct['PRODUCTO_ID']) => {
    const result = await pool.query<DBIngredient[]>(
        `
        SELECT F.* , I.NOMBRE AS 'INSUMO_NOMBRE', SP.NOMBRE AS 'SUBPRODUCTO_NOMBRE'
        FROM FORMULA_DETALLE F
        LEFT JOIN INSUMO I ON F.INGREDIENTE_ID = I.INSUMO_ID AND F.TIPO_INGREDIENTE = 'insumo'
        LEFT JOIN PRODUCTO SP ON F.INGREDIENTE_ID = SP.PRODUCTO_ID AND F.TIPO_INGREDIENTE = 'producto'
        WHERE F.PRODUCTO_ID = ?
        `,
        [productId],
    );

    return result[0];
};
