import { ROWS_PER_PAGE } from '@common/constants';
import { usePageNumber } from '@common/ui/hooks/usePageNumber';
import { useEffect, useRef, useState } from 'react';
import { AsyncListOptions, useAsyncList } from 'react-stately';

export type SortParams<Entity> = Parameters<
    NonNullable<AsyncListOptions<Entity, string>['sort']>
>[0];

export type LoadFunctionParams<Entity> = Parameters<AsyncListOptions<Entity, string>['load']>[0];

export type UseEntityTableOptions<Entity> = {
    getData: (params: LoadFunctionParams<Entity>) => Promise<{ items: Entity[]; total: number }>;

    sort?: (params: SortParams<Entity>) => { items: Entity[] };
};

const calcTotalPages = (totalMaterials: number) =>
    Math.max(Math.ceil(totalMaterials / ROWS_PER_PAGE), 1);

const getCursor = (page: number) => (page - 1) * ROWS_PER_PAGE;

export const useEntityTable = <Entity = unknown>(options: UseEntityTableOptions<Entity>) => {
    const { getData, sort } = options;

    const isSkeletonRef = useRef(true);
    const previousFilterTextRef = useRef<string>('');
    const [currentPage, setCurrentPage] = usePageNumber();
    const [totalPages, setTotalPages] = useState(10);

    const list = useAsyncList<Entity>({
        load: async params => {
            const { filterText } = params;

            const cursor = String(getCursor(currentPage));

            const validatedParams = { ...params, cursor };

            const { items, total } = await getData(validatedParams);

            const newTotalPages = calcTotalPages(total);

            const isNewFilterText = filterText !== previousFilterTextRef.current;
            const hasToResetCursor = isNewFilterText || currentPage > newTotalPages;
            if (hasToResetCursor) setCurrentPage(1);

            isSkeletonRef.current = false;
            previousFilterTextRef.current = filterText || '';

            setTotalPages(newTotalPages);

            return {
                items,
            };
        },
        sort,
    });

    useEffect(
        () => list.reload(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentPage],
    );

    return {
        list,
        isSkeleton: isSkeletonRef.current,
        currentPage,
        setCurrentPage,
        totalPages,
    };
};
