export const getCommonParams = (searchParams: URLSearchParams) => {
    return {
        filterText: searchParams.get('filterText') || '',
        cursor: searchParams.get('cursor') || '1',
        rowLimit: searchParams.get('rowLimit') || '10',
    };
};
