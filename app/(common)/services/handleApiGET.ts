import { getCommonParams } from '@common/services/getCommonParams';
import { getNextPageCursor } from '@common/services/getNextPageCursor';

export type GenericApiGETResponse<Data = unknown> = {
    data: Data;
    total: number;
    nextCursor: ReturnType<typeof getNextPageCursor>;
};

type CommonParams = ReturnType<typeof getCommonParams>;

type Options<Data> = {
    searchParams: URLSearchParams;
    getData: (params: CommonParams) => Promise<Data>;
    getRowsCount: (params: CommonParams) => Promise<number>;
};

/**
 * Handles basic common logic like getting params, using pagination and getting data.
 * @param options elements to customize handler
 */
export const handleApiGET = async <Data = unknown>(options: Options<Data>) => {
    const { searchParams, getData, getRowsCount } = options;

    const commonParams = getCommonParams(searchParams);
    const data = await getData(commonParams);
    const total = await getRowsCount(commonParams);
    const nextCursor = getNextPageCursor({
        cursor: +commonParams.cursor,
        rowLimit: +commonParams.rowLimit,
        total,
    });

    return {
        data,
        total,
        nextCursor,
    };
};
