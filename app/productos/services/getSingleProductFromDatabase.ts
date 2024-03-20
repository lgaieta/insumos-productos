import { pool } from '@common/services/pool';
import { DBProduct } from '@productos/services/getProductsListFromDatabase';
import type { RowDataPacket } from 'mysql2';

export const getSingleProductFromDatabase = async (id: number) => {
    const data = (
        await pool.query<RowDataPacket[]>('SELECT * FROM PRODUCTO WHERE PRODUCTO_ID = ?', [id])
    )[0] as DBProduct[];

    return data[0];
};
