import { getPool } from '@common/services/getPool';
import { DBMaterial } from '@insumos/services/getMaterialsFromDatabase';
import type { RowDataPacket } from 'mysql2';

export const getSingleMaterialFromDatabase = async (id: number) => {
    const pool = getPool();
    const data = (
        await pool.query<RowDataPacket[]>('SELECT * FROM INSUMO WHERE INSUMO_ID = ?', [id])
    )[0] as DBMaterial[];

    return data[0];
};
