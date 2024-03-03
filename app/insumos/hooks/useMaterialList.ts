import Material from '@common/entities/Material';
import { fetchMaterials } from '@insumos/services/fetchMaterials';
import { fetchMaterialsImages } from '@insumos/services/fetchMaterialsImages';
import { useState, useEffect, useRef } from 'react';
import { useAsyncList } from 'react-stately';
import { usePageNumber } from './usePageNumber';
import { mergeMaterialsWithImages } from '@insumos/adapters/mergeMaterialsWithImages';

const rowsPerPage = process.env.NEXT_PUBLIC_MATERIAL_ROWS_PER_PAGE
    ? parseInt(process.env.NEXT_PUBLIC_MATERIAL_ROWS_PER_PAGE)
    : 5;

const calcTotalPages = (totalMaterials: number) =>
    Math.max(Math.ceil(totalMaterials / rowsPerPage), 1);

export const useMaterialList = () => {
    const isSkeletonRef = useRef(true);
    const [currentPage, setCurrentPage] = usePageNumber();
    const [totalPages, setTotalPages] = useState(10);
    const [materialsImages, setMaterialsImages] = useState({});

    const loadImages = async (signal: AbortSignal) => {
        const imagesResponse = await fetchMaterialsImages({
            signal,
            filterText: list.filterText,
            page: currentPage,
            cache: 'no-store',
        });

        if (!signal.aborted) setMaterialsImages(imagesResponse);
    };

    const list = useAsyncList<Material>({
        async load({ signal, filterText }) {
            const materialsResponse = await fetchMaterials({
                signal,
                filterText,
                page: filterText ? 1 : currentPage,
                cache: 'no-store',
            });

            loadImages(signal);

            isSkeletonRef.current = false;

            setTotalPages(calcTotalPages(materialsResponse.total));
            if (filterText) setCurrentPage(1);

            return { items: materialsResponse.data };
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
    };
};
