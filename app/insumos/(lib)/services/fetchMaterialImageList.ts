import { FetchParams } from '@common/services/FetchTypes';
import { addParamsToURL } from '@common/utils/addParamsToURL';
import { MaterialImageListApiResponse } from '@insumos/api/imagenes/route';

export const fetchMaterialImageList = async (options?: FetchParams) => {
    const url = addParamsToURL('/insumos/api/imagenes', options?.params || {});
    const res = await fetch(url, options);
    const json: MaterialImageListApiResponse = await res.json();

    return json;
};
