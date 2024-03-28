import Material from '@common/entities/Material';
import { fetchMaterials } from '@insumos/services/fetchMaterials';
import { fetchMaterialsImages } from '@insumos/services/fetchMaterialsImages';
import { useState, useEffect, useRef } from 'react';
import { useAsyncList } from 'react-stately';
import { mergeMaterialsWithImages } from '@insumos/adapters/mergeMaterialsWithImages';
import { sortItems } from '@common/utils/sortItems';
import { usePageNumber } from '@insumos/hooks/usePageNumber';
import { materialListAdapter } from '@insumos/adapters/materialAdapter';
import { materialImageListAdapter } from '@insumos/adapters/materialImageAdapter';
import { ROWS_PER_PAGE } from '@common/constants';
import { bytesToBase64 } from '@common/utils/bytesToBase64';

const calcTotalPages = (totalMaterials: number) =>
    Math.max(Math.ceil(totalMaterials / ROWS_PER_PAGE), 1);

const getCursor = (page: number) => (page - 1) * ROWS_PER_PAGE;

export const useMaterialList = () => {
    const isSkeletonRef = useRef(true);
    const previousFilterTextRef = useRef<string>('');
    const [currentPage, setCurrentPage] = usePageNumber();
    const [totalPages, setTotalPages] = useState(10);

    const [materialsImages, setMaterialsImages] = useState<
        ReturnType<typeof materialImageListAdapter>
    >({});

    const loadImages = async ({
        cursor,
        filterText = '',
        signal,
    }: {
        cursor: number;
        filterText?: string;
        signal: AbortSignal;
    }) => {
        const imagesResponse = await fetchMaterialsImages({
            signal,
            params: {
                filterText,
                cursor: String(cursor),
                rowLimit: String(ROWS_PER_PAGE),
            },
            cache: 'no-store',
        });

        const adapted = imagesResponse.data.reduce(
            (acc: any, item: any) => ({
                ...acc,
                [item.INSUMO_ID]: `data:image/png;base64,${bytesToBase64(item.IMAGEN.data)}`,
            }),
            0,
        );

        console.log(adapted);

        if (!signal.aborted) setMaterialsImages(adapted);
    };

    const list = useAsyncList<Material>({
        async load({ signal, filterText = '', sortDescriptor }) {
            const cursor = getCursor(currentPage);
            const isNewFilterText = filterText !== previousFilterTextRef.current;

            const fetchedResponse = await fetchMaterials({
                signal,
                params: {
                    filterText,
                    cursor: String(cursor),
                    rowLimit: String(ROWS_PER_PAGE),
                },
                cache: 'no-store',
            });

            const newTotalPages = calcTotalPages(fetchedResponse.total);

            const hasToResetCursor = isNewFilterText || currentPage > newTotalPages;
            if (hasToResetCursor) setCurrentPage(1);

            loadImages({
                cursor: isNewFilterText || currentPage > newTotalPages ? 0 : cursor,
                signal,
                filterText,
            });

            isSkeletonRef.current = false;
            previousFilterTextRef.current = filterText || '';

            setTotalPages(newTotalPages);

            const adaptedData = materialListAdapter(fetchedResponse.data);
            return {
                items: adaptedData.sort((a, b) =>
                    sortItems(a, b, sortDescriptor || { column: 'name', direction: 'ascending' }),
                ),
            };
        },

        async sort({ items, sortDescriptor }) {
            return {
                items: items.sort((first, second) => sortItems(first, second, sortDescriptor)),
            };
        },
    });

    useEffect(
        () => list.reload(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentPage],
    );

    return {
        items: mergeMaterialsWithImages(list.items, materialsImages),
        filterText: list.filterText,
        setFilterText: list.setFilterText,
        isSkeleton: isSkeletonRef.current,
        currentPage,
        setCurrentPage,
        totalPages,
        isLoading: list.isLoading,
        sort: list.sort,
        sortDescriptor: list.sortDescriptor,
    };
};
