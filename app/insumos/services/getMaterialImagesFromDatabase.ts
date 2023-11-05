import { getPool } from '@/(common)/services/getPool';

export type IncomingImage = {
    INSUMO_ID: number;
    IMAGEN: Buffer | null;
};

export async function getMaterialImagesFromDatabase() {
    const pool = getPool();
    const data = (await pool.query('SELECT INSUMO_ID, IMAGEN FROM insumo'))[0] as IncomingImage[];
    return data;
}
