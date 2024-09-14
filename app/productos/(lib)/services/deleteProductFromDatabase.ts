import { pool } from '@common/services/pool';

export const deleteProductFromDatabase = async (id: number) => {
    await pool.query('DELETE FROM PRODUCTO WHERE PRODUCTO_ID = ?', [id]);
};
