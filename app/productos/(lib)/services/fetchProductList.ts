import { FetchParams } from '@common/services/FetchTypes';
import { addParamsToURL } from '@common/utils/addParamsToURL';
import { ProductListApiResponse } from '@productos/api/route';

export const fetchProductList = async (options?: FetchParams) => {
    const url = addParamsToURL('/productos/api', options?.params || {});

    const res = await fetch(url, options);
    const json: ProductListApiResponse = await res.json();

    return json;
};
