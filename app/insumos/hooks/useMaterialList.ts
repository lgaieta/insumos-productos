import Material from '@common/entities/Material';
import { fetchMaterials } from '@insumos/services/fetchMaterials';
import { fetchMaterialsImages } from '@insumos/services/fetchMaterialsImages';
import { useState, useEffect, useRef } from 'react';
import { useAsyncList } from 'react-stately';
import { mergeMaterialsWithImages } from '@insumos/adapters/mergeMaterialsWithImages';
import { sortItems } from '@common/utils/sortItems';
import { usePageNumber } from '@insumos/hooks/usePageNumber';

const rowsPerPage = process.env.NEXT_PUBLIC_MATERIAL_ROWS_PER_PAGE
    ? parseInt(process.env.NEXT_PUBLIC_MATERIAL_ROWS_PER_PAGE)
    : 5;

const calcTotalPages = (totalMaterials: number) =>
    Math.max(Math.ceil(totalMaterials / rowsPerPage), 1);

export const useMaterialList = () => {
    const isSkeletonRef = useRef(true);
    const previousFilterTextRef = useRef<string>('');
    const [currentPage, setCurrentPage] = usePageNumber();
    const [totalPages, setTotalPages] = useState(10);
    const [materialsImages, setMaterialsImages] = useState({});

    const loadImages = async ({
        page,
        filterText,
        signal,
    }: {
        page: number;
        filterText?: string;
        signal: AbortSignal;
    }) => {
        const imagesResponse = await fetchMaterialsImages({
            signal,
            filterText,
            page,
            cache: 'no-store',
        });

        if (!signal.aborted) setMaterialsImages(imagesResponse);
    };

    const list = useAsyncList<Material>({
        async load({ signal, filterText, sortDescriptor }) {
            const isNewFilterText = filterText !== previousFilterTextRef.current;

            const materialsResponse = (await fetchMaterials({
                signal,
                filterText,
                page: isNewFilterText ? 1 : currentPage,
                cache: 'no-store',
            })) as { total: number; data: Material[] };

            const newTotal = calcTotalPages(materialsResponse.total);

            if (isNewFilterText || currentPage > newTotal) setCurrentPage(1);

            loadImages({
                page: isNewFilterText || currentPage > newTotal ? 1 : currentPage,
                signal,
                filterText,
            });

            isSkeletonRef.current = false;
            previousFilterTextRef.current = filterText || '';

            setTotalPages(newTotal);

            return {
                items: materialsResponse.data.sort((a, b) =>
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
