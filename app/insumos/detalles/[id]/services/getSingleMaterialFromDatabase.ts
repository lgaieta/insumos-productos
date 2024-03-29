import { pool } from '@common/services/pool';
import { DBMaterial } from '@insumos/api/services/getMaterialsListFromDatabase';
import type { RowDataPacket } from 'mysql2';

export const getSingleMaterialFromDatabase = async (id: number) => {
    const data = (
        await pool.query<RowDataPacket[]>('SELECT * FROM INSUMO WHERE INSUMO_ID = ?', [id])
    )[0] as DBMaterial[];

    return data[0];
};
