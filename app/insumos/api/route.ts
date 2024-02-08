import { DBMaterial } from '@common/services/DBMaterial';
import { pool } from '@common/services/pool';
import { materialListAdapter } from '@insumos/adapters/materialAdapter';
import { RowDataPacket } from 'mysql2';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const filterText = searchParams.get('filterText');

    const data = (
        await pool.query<RowDataPacket[]>(
            'SELECT INSUMO_ID, NOMBRE, COSTO_UNITARIO, LINK FROM insumo WHERE NOMBRE LIKE ?',
            `%${filterText || ''}%`,
        )
    )[0] as DBMaterial[];

    return Response.json(materialListAdapter(data));
}
