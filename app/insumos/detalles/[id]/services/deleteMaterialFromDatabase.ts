import { pool } from '@common/services/pool';

export const deleteMaterialFromDatabase = async (id: number) => {
    await pool.query('DELETE FROM INSUMO WHERE INSUMO_ID = ?', [id]);
};
