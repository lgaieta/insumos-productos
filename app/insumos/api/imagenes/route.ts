import { GenericErrorResponse } from '@common/services/GenericErrorResponse';
import { GenericApiGETResponse, handleApiGET } from '@common/services/handleApiGET';
import { getCommonParams } from '@common/services/getCommonParams';
import { getNextPageCursor } from '@common/services/getNextPageCursor';
import {
    DBMaterialImage,
    getMaterialsImagesFromDatabase,
} from '@insumos/services/getMaterialImagesFromDatabase';
import { getMaterialRowsCount } from '@insumos/services/getMaterialRowsCount';
import { type NextRequest } from 'next/server';

type JsonStringifiedBuffer = {
    data: number[];
    type: 'Buffer';
};

type StringifiedDBImage = {
    INSUMO_ID: DBMaterialImage['INSUMO_ID'];
    IMAGEN: JsonStringifiedBuffer | null;
};

export type MaterialImageListApiResponse = GenericApiGETResponse<StringifiedDBImage[]>;

export async function GET(request: NextRequest) {
    try {
        const { data, total, nextCursor } = await handleApiGET({
            searchParams: request.nextUrl.searchParams,
            getData: async params =>
                await getMaterialsImagesFromDatabase({
                    filterText: params.filterText,
                    cursor: +params.cursor,
                    rowLimit: +params.rowLimit,
                }),
            getRowsCount: async params => await getMaterialRowsCount(params.filterText),
        });

        const dataWithNullsFiltered = data.filter(row => row.IMAGEN !== null);

        const adaptedData = dataWithNullsFiltered.map(item => ({
            INSUMO_ID: item.INSUMO_ID,
            IMAGEN: item.IMAGEN?.toJSON() || null,
        }));

        const response: MaterialImageListApiResponse = {
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
