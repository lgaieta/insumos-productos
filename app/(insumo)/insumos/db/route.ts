import { getPool } from '@/services/getPool';

export async function GET() {
    const pool = getPool();
    const data = (
        await pool.query(
            'SELECT INSUMO_ID, NOMBRE, COSTO_UNITARIO, LINK FROM insumo',
        )
    )[0];

    return Response.json(data);
}
