import { GenericErrorResponse } from '@common/services/GenericErrorResponse';
import { GenericApiGETResponse, handleApiGET } from '@common/services/handleApiGET';
import {
    DBProductImage,
    getProductImageListFromDatabase,
} from '@productos/services/getProductImageListFromDatabase';
import { getProductRowsCount } from '@productos/services/getProductRowsCount';
import { type NextRequest } from 'next/server';

type JsonStringifiedBuffer = {
    data: number[];
    type: 'Buffer';
};

type StringifiedDBProductImage = {
    PRODUCTO_ID: DBProductImage['PRODUCTO_ID'];
    IMAGEN: JsonStringifiedBuffer | null;
};

export type ProductImageListApiResponse = GenericApiGETResponse<StringifiedDBProductImage[]>;

export async function GET(request: NextRequest) {
    try {
        const { data, total, nextCursor } = await handleApiGET({
            searchParams: request.nextUrl.searchParams,
            getData: async params =>
                await getProductImageListFromDatabase({
                    filterText: params.filterText,
                    cursor: +params.cursor,
                    rowLimit: +params.rowLimit,
                }),
            getRowsCount: async params => await getProductRowsCount(params.filterText),
        });

        const dataWithNullsFiltered = data.filter(row => row.IMAGEN !== null);

        const adaptedData = dataWithNullsFiltered.map(item => ({
            PRODUCTO_ID: item.PRODUCTO_ID,
            IMAGEN: item.IMAGEN?.toJSON() || null,
        }));

        const response: ProductImageListApiResponse = {
            data: adaptedData,
            total,
            nextCursor,
        };

        return Response.json(response);
    } catch (e) {
        console.error(e);
        return GenericErrorResponse();
    }
}
