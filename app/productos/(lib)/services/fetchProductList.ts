import type Product from '@common/entities/Product';
import { FetchParams } from '@common/services/FetchTypes';
import type { GenericApiGETResponse } from '@common/services/handleApiGET';
import { addParamsToURL } from '@common/utils/addParamsToURL';

export const fetchProductList = async (options?: FetchParams) => {
    const url = addParamsToURL('/productos/api', options?.params || {});

    const res = await fetch(url, options);
    const json: GenericApiGETResponse<Product[]> = await res.json();

    return json;
};
