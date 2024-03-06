import { materialListAdapter } from '@insumos/adapters/materialAdapter';
import { type NextRequest } from 'next/server';
import { getRowsCount } from './services/getRowsCount';
import { getMaterialsListFromDatabase } from './services/getMaterialsListFromDatabase';
import { validatePageParam } from './utils/validatePageParam';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const filterText = searchParams.get('filterText') || '';
        const pageParam = searchParams.get('page');

        const rowsPerPage = process.env.NEXT_PUBLIC_MATERIAL_ROWS_PER_PAGE
            ? parseInt(process.env.NEXT_PUBLIC_MATERIAL_ROWS_PER_PAGE)
            : 5;

        const totalCount = await getRowsCount(filterText);
        const totalPages = Math.ceil(totalCount / rowsPerPage);

        const page = validatePageParam(pageParam, totalPages);

        const data = await getMaterialsListFromDatabase({ filterText, page, rowsPerPage });

        return Response.json({ data: materialListAdapter(data), total: totalCount });
    } catch (e) {
        console.error(e);
        return Response.json({}, { status: 500 });
    }
}
