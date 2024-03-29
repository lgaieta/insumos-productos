import { FetchParams } from '@common/services/FetchTypes';
import { addParamsToURL } from '@common/utils/addParamsToURL';
import { MaterialListApiResponse } from '@insumos/api/route';

export const fetchMaterialList = async (options?: FetchParams) => {
    const url = addParamsToURL('/insumos/api', options?.params || {});

    const res = await fetch(url, options);
    const json: MaterialListApiResponse = await res.json();

    return json;
};
