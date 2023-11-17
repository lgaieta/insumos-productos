import { pool } from '@common/services/pool';

export type IncomingImage = {
    INSUMO_ID: number;
    IMAGEN: Buffer | null;
};

export async function getMaterialImagesFromDatabase() {
    const data = (await pool.query('SELECT INSUMO_ID, IMAGEN FROM insumo'))[0] as IncomingImage[];
    return data;
}
