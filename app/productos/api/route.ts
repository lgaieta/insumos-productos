import { getRowsCount } from '@productos/api/services/getRowsCount';
import { validatePageParam } from '@productos/api/utils/validatePageParam';
import { productsListAdapter } from '@productos/adapters/productAdapter';
import { getProductsListFromDatabase } from '@productos/api/services/getProductsListFromDatabase';
import { type NextRequest } from 'next/server';

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

        const data = await getProductsListFromDatabase({ filterText, page, rowsPerPage });

        return Response.json({ data: productsListAdapter(data), total: totalCount });
    } catch (e) {
        console.error(e);
        return Response.json({}, { status: 500 });
    }
}
