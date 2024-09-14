import { pool } from '@common/services/pool';
import { DBProduct } from '@productos/(lib)/services/getProductListFromDatabase';
import { RowDataPacket } from 'mysql2';

export type DBProductImage = Pick<DBProduct, 'PRODUCTO_ID' | 'IMAGEN'> & RowDataPacket;

type Options = {
    filterText: string;
    cursor: number;
    rowLimit: number;
};
export const getProductImageListFromDatabase = async ({ filterText, cursor, rowLimit }: Options) =>
    (
        await pool.query<DBProductImage[]>(
            'SELECT PRODUCTO_ID, IMAGEN FROM PRODUCTO WHERE NOMBRE LIKE ? LIMIT ? OFFSET ?',
            [`%${filterText}%`, cursor, rowLimit],
        )
    )[0];
