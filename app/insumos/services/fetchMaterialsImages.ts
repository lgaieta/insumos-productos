import { addParamsToURL } from '@common/utils/addParamsToURL';
import { MaterialImageListApiResponse } from '@insumos/api/imagenes/route';

export const fetchMaterialsImages = async (
    options?: RequestInit & { params: Record<string, string> },
) => {
    const url = addParamsToURL('/insumos/api/imagenes', options?.params || {});
    const res = await fetch(url, options);
    const json = await res.json();

    return json;
};
