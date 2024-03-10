import { pool } from '@common/services/pool';
import { RowDataPacket } from 'mysql2';
import { DBProduct } from './getProductsListFromDatabase';

export type DBProductImage = Pick<DBProduct, 'PRODUCTO_ID' | 'IMAGEN'> & RowDataPacket;

type Options = {
    filterText: string;
    page: number;
    rowsPerPage: number;
};

export const getProductsImagesFromDatabase = async ({ filterText, page, rowsPerPage }: Options) =>
    (
        await pool.query<DBProductImage[]>(
            'SELECT PRODUCTO_ID, IMAGEN FROM PRODUCTO WHERE NOMBRE LIKE ? LIMIT ?, ?',
            [`%${filterText}%`, (page - 1) * rowsPerPage, rowsPerPage],
        )
    )[0];
