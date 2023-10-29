import { getPool } from '@/services/getPool';
import { RowDataPacket } from 'mysql2';

export async function GET() {
    const pool = getPool();
    const data = (await pool.query('SELECT INSUMO_ID, IMAGEN FROM insumo'))[0] as RowDataPacket[];
    return Response.json(data);
}
