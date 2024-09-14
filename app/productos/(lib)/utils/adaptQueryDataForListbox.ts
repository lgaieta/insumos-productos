import { InfiniteData } from '@tanstack/react-query';

export const adaptQueryDataForListbox = <Data = unknown>(
    infiniteData: InfiniteData<{ items: Data[]; nextCursor: number | null }>,
) => infiniteData.pages.map(page => page.items).flat();
