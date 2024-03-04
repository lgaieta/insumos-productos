export const validatePageParam = (pageParam: string | null, totalPages: number) => {
    const pageParamParsed = pageParam ? Math.max(parseInt(pageParam), 1) : 1;
    const page = pageParamParsed <= totalPages ? pageParamParsed : 1;
    return page;
};
