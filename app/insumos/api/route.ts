import { GenericErrorResponse } from '@common/services/GenericErrorResponse';
import { getCommonParams } from '@common/utils/getCommonParams';
import { getNextPageCursor } from '@common/utils/getNextPageCursor';
import {
    DBMaterial,
    getMaterialListFromDatabase,
} from '@insumos/services/getMaterialListFromDatabase';
import { getMaterialRowsCount } from '@insumos/services/getMaterialRowsCount';
import { type NextRequest } from 'next/server';

export type MaterialListApiResponse = {
    data: DBMaterial[];
    total: number;
    nextCursor: number;
};

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const { filterText, cursor, rowLimit } = getCommonParams(params);

    try {
        const getDataPromise = getMaterialListFromDatabase({
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

        const response: MaterialListApiResponse = {
            data: dataPromiseSettled.value,
            total,
            nextCursor: getNextPageCursor({ cursor: +cursor, rowLimit: +rowLimit, total }),
        };

        return Response.json(response);
    } catch (e) {
        console.error(e);
        return GenericErrorResponse();
    }
}
