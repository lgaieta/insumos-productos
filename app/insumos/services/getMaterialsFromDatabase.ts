import { getPool } from '@/(common)/services/getPool';

export type DBMaterial = {
    INSUMO_ID: number;
    NOMBRE: string;
    COSTO_UNITARIO: string;
    LINK: null | string;
};

export async function getMaterialsFromDatabase() {
    const pool = getPool();
    const data = (
        await pool.query('SELECT INSUMO_ID, NOMBRE, COSTO_UNITARIO, LINK FROM insumo')
    )[0];

    return data as DBMaterial[];
}
