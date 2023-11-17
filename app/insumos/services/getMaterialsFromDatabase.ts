import { DBMaterial } from '@common/services/DBMaterial';
import { pool } from '@common/services/pool';

export async function getMaterialsFromDatabase() {
    const data = (
        await pool.query('SELECT INSUMO_ID, NOMBRE, COSTO_UNITARIO, LINK FROM insumo')
    )[0];

    return data as DBMaterial[];
}
