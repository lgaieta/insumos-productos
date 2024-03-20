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
    page: number;
    rowsPerPage: number;
};

export const getProductsListFromDatabase = async ({ filterText, page, rowsPerPage }: Options) =>
    (
        await pool.query<DBProduct[]>(
            'SELECT PRODUCTO_ID, NOMBRE, COSTO_UNITARIO, LINK FROM PRODUCTO WHERE NOMBRE LIKE ? LIMIT ?, ?',
            [`%${filterText}%`, (page - 1) * rowsPerPage, rowsPerPage],
        )
    )[0];
