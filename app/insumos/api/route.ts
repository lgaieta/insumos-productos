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

    const rowsPerPage = process.env.NEXT_PUBLIC_MATERIAL_ROWS_PER_PAGE
        ? parseInt(process.env.NEXT_PUBLIC_MATERIAL_ROWS_PER_PAGE)
        : 5;

    const rowsStartIndex = (page - 1) * rowsPerPage;
    const filterTextForQuery = `%${filterText || ''}%`;

    const data = (
        await pool.query<RowDataPacket[]>(
            'SELECT INSUMO_ID, NOMBRE, COSTO_UNITARIO, LINK FROM INSUMO WHERE NOMBRE LIKE ? LIMIT ?, ?',
            [filterTextForQuery, rowsStartIndex, rowsPerPage],
        )
    )[0] as DBMaterial[];

    const rowCountQuery = (
        await pool.query<RowDataPacket[]>(
            'SELECT COUNT(*) AS total FROM INSUMO WHERE NOMBRE LIKE ?',
            [filterTextForQuery],
        )
    )[0][0];

    return Response.json({ data: materialListAdapter(data), total: rowCountQuery.total });
}
