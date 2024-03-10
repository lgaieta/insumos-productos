import Product from '@common/entities/Product';
import { fetchProducts } from '@productos/services/fetchProducts';
import { fetchProductsImages } from '@productos/services/fetchProductsImages';
import { useState, useEffect, useRef } from 'react';
import { useAsyncList } from 'react-stately';
import { usePageNumber } from './usePageNumber';
import { mergeProductsWithImages } from '@productos/adapters/mergeProductsWithImages';
import { sortItems } from '@common/utils/sortItems';

const rowsPerPage = process.env.NEXT_PUBLIC_MATERIAL_ROWS_PER_PAGE
    ? parseInt(process.env.NEXT_PUBLIC_MATERIAL_ROWS_PER_PAGE)
    : 5;

const calcTotalPages = (totalProducts: number) =>
    Math.max(Math.ceil(totalProducts / rowsPerPage), 1);

export const useProductList = () => {
    const isSkeletonRef = useRef(true);
    const previousFilterTextRef = useRef<string>('');
    const [currentPage, setCurrentPage] = usePageNumber();
    const [totalPages, setTotalPages] = useState(10);
    const [ProductsImages, setProductsImages] = useState({});

    const loadImages = async ({
        page,
        filterText,
        signal,
    }: {
        page: number;
        filterText?: string;
        signal: AbortSignal;
    }) => {
        const imagesResponse = await fetchProductsImages({
            signal,
            filterText,
            page,
            cache: 'no-store',
        });

        if (!signal.aborted) setProductsImages(imagesResponse);
    };

    const list = useAsyncList<Product>({
        async load({ signal, filterText, sortDescriptor }) {
            const isNewFilterText = filterText !== previousFilterTextRef.current;

            const ProductsResponse = (await fetchProducts({
                signal,
                filterText,
                page: isNewFilterText ? 1 : currentPage,
                cache: 'no-store',
            })) as { total: number; data: Product[] };

            const newTotal = calcTotalPages(ProductsResponse.total);

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
                items: ProductsResponse.data.sort((a, b) =>
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
        items: mergeProductsWithImages(list.items, ProductsImages),
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
