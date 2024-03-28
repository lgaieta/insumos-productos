import { addParamsToURL } from '@common/utils/addParamsToURL';
import { MaterialListApiResponse } from '@insumos/api/route';

export const fetchMaterials = async (
    options?: RequestInit & { params: Record<string, string> },
) => {
    const url = addParamsToURL('/insumos/api', options?.params || {});

    const res = await fetch(url, options);
    const json: MaterialListApiResponse = await res.json();

    return json;
};
