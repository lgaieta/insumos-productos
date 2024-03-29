import { pool } from '@common/services/pool';
import { RowDataPacket } from 'mysql2';

export interface DBProduct extends RowDataPacket {
    PRODUCTO_ID: number;
    NOMBRE: string;
    COSTO_UNITARIO: string;
    LINK: null | string;
    IMAGEN?: null | Buffer;
}

type Options = {
    filterText: string;
    cursor: number;
    rowLimit: number;
};

export const getProductListFromDatabase = async ({ filterText, cursor, rowLimit }: Options) =>
    (
        await pool.query<DBProduct[]>(
            'SELECT PRODUCTO_ID, NOMBRE, COSTO_UNITARIO, LINK FROM PRODUCTO WHERE NOMBRE LIKE ? LIMIT ? OFFSET ?',
            [`%${filterText}%`, rowLimit, cursor],
        )
    )[0];
