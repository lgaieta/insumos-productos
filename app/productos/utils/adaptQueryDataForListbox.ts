import { InfiniteData } from '@tanstack/react-query';

export const getFlattenInfiniteData = <Data = { nextCursor: number; items: unknown[] }>(
    data: InfiniteData<Data>,
) => data.pages.flat();

export const adaptQueryDataForListbox = <Data = unknown>(
    infiniteData: InfiniteData<{ items: Data[]; nextCursor: number | null }>,
) => infiniteData.pages.map(page => page.items).flat();
