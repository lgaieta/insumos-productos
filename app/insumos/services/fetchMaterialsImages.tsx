export const fetchMaterialsImages = async (options?: RequestInit & { filterText?: string }) => {
    let url = '/insumos/api/imagenes?';

    if (options?.filterText)
        url += new URLSearchParams([['filterText', options.filterText]]).toString();

    const res = await fetch(url, options);
    const json = await res.json();

    return json;
};
