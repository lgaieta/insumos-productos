import { pool } from '@common/services/pool';

export const deleteMaterialFromDatabase = async (id: number) => {
    await pool.query('DELETE FROM insumo WHERE INSUMO_ID = ?', [id]);
};
