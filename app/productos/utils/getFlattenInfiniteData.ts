import { InfiniteData } from '@tanstack/react-query';

export const getFlattenInfiniteData = <DataType = unknown>(data: InfiniteData<DataType>) =>
    data.pages.flat();
