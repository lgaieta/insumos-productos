import { pool } from '@common/services/pool';
import { materialImageListAdapter } from '@insumos/adapters/materialImageAdapter';
import { RowDataPacket } from 'mysql2';
import { type NextRequest } from 'next/server';

export type IncomingImage = {
    INSUMO_ID: number;
    IMAGEN: Buffer | null;
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const filterText = searchParams.get('filterText');
    const pageParam = searchParams.get('page');

    const page = pageParam ? parseInt(pageParam) : 1;
    const rowsPerPage = process.env.NEXT_PUBLIC_MATERIAL_ROWS_PER_PAGE
        ? parseInt(process.env.NEXT_PUBLIC_MATERIAL_ROWS_PER_PAGE)
        : 5;

    const data = (
        await pool.query<RowDataPacket[]>(
            'SELECT INSUMO_ID, IMAGEN FROM insumo WHERE NOMBRE LIKE ? LIMIT ?, ?',
            [`%${filterText || ''}%`, (page - 1) * rowsPerPage, rowsPerPage],
        )
    )[0] as IncomingImage[];

    return Response.json(materialImageListAdapter(data));
}
