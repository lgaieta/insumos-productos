import { getPool } from '@/(common)/services/getPool';
import { DBMaterial } from '@/insumos/services/getMaterialsFromDatabase';

export const getSingleMaterialFromDatabase = async (id: number) => {
    const pool = getPool();
    const data = (
        await pool.query('SELECT * FROM INSUMO WHERE INSUMO_ID = ?', [id])
    )[0] as DBMaterial[];

    return data[0];
};
