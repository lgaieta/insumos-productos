import { GenericErrorResponse } from '@common/services/GenericErrorResponse';
import { handleApiGET } from '@common/services/handleApiGET';
import { getCommonParams } from '@common/services/getCommonParams';
import { getNextPageCursor } from '@common/services/getNextPageCursor';
import {
    DBMaterial,
    getMaterialListFromDatabase,
} from '@insumos/services/getMaterialListFromDatabase';
import { getMaterialRowsCount } from '@insumos/services/getMaterialRowsCount';
import { type NextRequest } from 'next/server';

export type MaterialListApiResponse = {
    data: DBMaterial[];
    total: number;
    nextCursor: ReturnType<typeof getNextPageCursor>;
};

export async function GET(request: NextRequest) {
    try {
        const response: MaterialListApiResponse = await handleApiGET({
            searchParams: request.nextUrl.searchParams,
            getData: async params =>
                await getMaterialListFromDatabase({
                    filterText: params.filterText,
                    cursor: +params.cursor,
                    rowLimit: +params.rowLimit,
                }),
            getRowsCount: async params => await getMaterialRowsCount(params.filterText),
        });

        return Response.json(response);
    } catch (e) {
        console.error(e);
        return GenericErrorResponse();
    }
}
