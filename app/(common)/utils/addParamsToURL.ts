export const addParamsToURL = (
    url: string,
    params: Record<string, string>,
    defaultParams?: URLSearchParams,
) => {
    const searchParams = new URLSearchParams(defaultParams);
    Object.entries(params).forEach(([key, value]) => searchParams.append(key, value));

    return `${url}?${searchParams.toString()}`;
};
