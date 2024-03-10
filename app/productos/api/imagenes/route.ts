import { productsImageListAdapter } from '@productos/adapters/productImageAdapter';
import { type NextRequest } from 'next/server';
import { getProductsImagesFromDatabase } from '../services/getProductsImagesFromDatabase';
import { getRowsCount } from '../services/getRowsCount';
import { validatePageParam } from '../utils/validatePageParam';

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

        const data = await getProductsImagesFromDatabase({ filterText, page, rowsPerPage });

        const dataWithNullsFiltered = data.filter(row => row.IMAGEN !== null);

        return Response.json(productsImageListAdapter(dataWithNullsFiltered));
    } catch (e) {
        console.error(e);
        return Response.json({}, { status: 500 });
    }
}
