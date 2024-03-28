import { GenericErrorResponse } from '@common/services/GenericErrorResponse';
import { getCommonParams } from '@common/utils/getCommonParams';
import { getNextPageCursor } from '@common/utils/getNextPageCursor';
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

export type MaterialImageListApiResponse = {
    data: StringifiedDBImage[];
    total: number;
    nextCursor: ReturnType<typeof getNextPageCursor>;
};

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const { filterText, cursor, rowLimit } = getCommonParams(params);

    try {
        const getDataPromise = getMaterialsImagesFromDatabase({
            filterText,
            cursor: +cursor,
            rowLimit: +rowLimit,
        });

        const getTotalPromise = getMaterialRowsCount(filterText);

        const [dataPromiseSettled, totalPromiseSettled] = await Promise.allSettled([
            getDataPromise,
            getTotalPromise,
        ]);

        if (dataPromiseSettled.status === 'rejected') return GenericErrorResponse();
        if (totalPromiseSettled.status === 'rejected') return GenericErrorResponse();

        const { value: total } = totalPromiseSettled;

        const dataWithNullsFiltered = dataPromiseSettled.value.filter(row => row.IMAGEN !== null);

        const adaptedData = dataWithNullsFiltered.map(item => ({
            INSUMO_ID: item.INSUMO_ID,
            IMAGEN: item.IMAGEN?.toJSON() || null,
        }));

        const response: MaterialImageListApiResponse = {
            data: adaptedData,
            total,
            nextCursor: getNextPageCursor({ cursor: +cursor, rowLimit: +rowLimit, total }),
        };

        return Response.json(response);
    } catch (e) {
        console.error(e);
        return GenericErrorResponse();
    }
}
