import {
    DBMaterialImage,
    getMaterialsImagesFromDatabase,
} from '@insumos/services/getMaterialsImagesFromDatabase';
import { getRowsCount } from '@insumos/services/getRowsCount';
import { validatePageParam } from '@insumos/utils/validatePageParam';
import { type NextRequest } from 'next/server';

export type MaterialImageListApiResponse = DBMaterialImage[];

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

        const data = await getMaterialsImagesFromDatabase({ filterText, page, rowsPerPage });

        const dataWithNullsFiltered: MaterialImageListApiResponse = data.filter(
            row => row.IMAGEN !== null,
        );

        return Response.json(dataWithNullsFiltered);
    } catch (e) {
        console.error(e);
        return Response.json({}, { status: 500 });
    }
}
