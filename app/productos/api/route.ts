import { GenericErrorResponse } from '@common/services/GenericErrorResponse';
import { GenericApiGETResponse, handleApiGET } from '@common/services/handleApiGET';
import {
    DBProduct,
    getProductListFromDatabase,
} from '@productos/(lib)/services/getProductListFromDatabase';
import { getProductRowsCount } from '@productos/(lib)/services/getProductRowsCount';
import { type NextRequest } from 'next/server';

export type ProductListApiResponse = GenericApiGETResponse<DBProduct[]>;

export async function GET(request: NextRequest) {
    try {
        const response: ProductListApiResponse = await handleApiGET({
            searchParams: request.nextUrl.searchParams,
            getData: async params =>
                await getProductListFromDatabase({
                    filterText: params.filterText,
                    cursor: +params.cursor,
                    rowLimit: +params.rowLimit,
                }),
            getRowsCount: async params => await getProductRowsCount(params.filterText),
        });

        return Response.json(response);
    } catch (e) {
        console.error(e);
        return GenericErrorResponse();
    }
}
