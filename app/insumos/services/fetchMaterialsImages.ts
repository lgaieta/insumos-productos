import { MaterialImageListApiResponse } from '@insumos/api/imagenes/route';

export const fetchMaterialsImages = async (
    options?: RequestInit & { filterText?: string; page?: number },
) => {
    let url = '/insumos/api/imagenes?';
    let searchParams = new URLSearchParams();

    if (options?.filterText) searchParams.append('filterText', options.filterText);

    if (options?.page) searchParams.append('page', String(options.page));

    const res = await fetch(url + searchParams.toString(), options);
    const json: MaterialImageListApiResponse = await res.json();

    return json;
};
