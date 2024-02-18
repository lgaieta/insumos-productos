import { DBMaterial } from '@common/services/DBMaterial';
import { pool } from '@common/services/pool';
import { materialListAdapter } from '@insumos/adapters/materialAdapter';
import { RowDataPacket } from 'mysql2';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const filterText = searchParams.get('filterText');
    const pageParam = searchParams.get('page');

    const page = pageParam ? parseInt(pageParam) : 1;

    const data = (
        await pool.query<RowDataPacket[]>(
            'SELECT INSUMO_ID, NOMBRE, COSTO_UNITARIO, LINK FROM insumo WHERE NOMBRE LIKE ? LIMIT ?, 10',
            [`%${filterText || ''}%`, (page - 1) * 10],
        )
    )[0] as DBMaterial[];

    const rowCountQuery = (
        await pool.query<RowDataPacket[]>('SELECT COUNT(*) AS total FROM insumo')
    )[0][0];

    return Response.json({ data: materialListAdapter(data), total: rowCountQuery.total });
}
