import { getRowsCount } from '@productos/services/getRowsCount';
import { validatePageParam } from '@productos/utils/validatePageParam';
import { productsImageListAdapter } from '@productos/adapters/productImageAdapter';
import { getProductsImagesFromDatabase } from '@productos/services/getProductsImagesFromDatabase';
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

        const data = await getProductsImagesFromDatabase({ filterText, page, rowsPerPage });

        const dataWithNullsFiltered = data.filter(row => row.IMAGEN !== null);

        return Response.json(productsImageListAdapter(dataWithNullsFiltered));
    } catch (e) {
        console.error(e);
        return Response.json({}, { status: 500 });
    }
}
