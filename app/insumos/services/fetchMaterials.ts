export const fetchMaterials = async (
    options?: RequestInit & { filterText?: string; page?: number },
) => {
    let url = '/insumos/api?';
    let searchParams = new URLSearchParams();

    if (options?.filterText) searchParams.append('filterText', options.filterText);

    if (options?.page) searchParams.append('page', String(options.page));

    const res = await fetch(url + searchParams.toString(), options);
    const json = await res.json();

    return json;
};
