import { FetchParams } from '@common/services/FetchTypes';
import { addParamsToURL } from '@common/utils/addParamsToURL';
import { ProductImageListApiResponse } from '@productos/api/imagenes/route';

export const fetchProductImageList = async (options?: FetchParams) => {
    const url = addParamsToURL('/productos/api/imagenes', options?.params || {});
    const res = await fetch(url, options);
    const json: ProductImageListApiResponse = await res.json();

    return json;
};
