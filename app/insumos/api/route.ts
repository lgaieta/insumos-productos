import { GenericErrorResponse } from '@common/services/GenericErrorResponse';
import { GenericApiGETResponse, handleApiGET } from '@common/services/handleApiGET';
import {
    DBMaterial,
    getMaterialListFromDatabase,
} from '@insumos/services/getMaterialListFromDatabase';
import { getMaterialRowsCount } from '@insumos/services/getMaterialRowsCount';
import { type NextRequest } from 'next/server';

export type MaterialListApiResponse = GenericApiGETResponse<DBMaterial[]>;
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
