import type { MaterialId } from '@common/entities/Material';
import { GenericErrorResponse } from '@common/services/GenericErrorResponse';
import { GenericApiGETResponse, handleApiGET } from '@common/services/handleApiGET';
import MySQLMaterialRepository from '@insumos/(lib)/services/MySQLMaterialRepository';
import { type NextRequest } from 'next/server';

export type MaterialImageListApiResponse = GenericApiGETResponse<
    { id: MaterialId; image: string | null }[]
>;

export async function GET(request: NextRequest) {
    try {
        const materialRepository = new MySQLMaterialRepository();
        const { data, total, nextCursor } = await handleApiGET({
            searchParams: request.nextUrl.searchParams,
            getData: async params =>
                await materialRepository.getImageList({
                    filterText: params.filterText,
                    cursor: +params.cursor,
                    rowLimit: +params.rowLimit,
                }),
            getRowsCount: async params =>
                await materialRepository.getMaterialsCount(params.filterText),
        });

        const response: MaterialImageListApiResponse = {
            data,
            total,
            nextCursor,
        };

        return Response.json(response);
    } catch (e) {
        console.error(e);
        return GenericErrorResponse();
    }
}
