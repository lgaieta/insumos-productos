import { ROWS_PER_PAGE } from '@common/constants';
import Product from '@common/entities/Product';
import { LoadFunctionParams, useEntityTable } from '@common/hooks/useEntityTable';
import { sortItems } from '@common/utils/sortItems';
import { productListAdapter } from '@productos/adapters/productAdapter';
import { productImageListAdapter } from '@productos/adapters/productImageAdapter';
import { mergeProductsWithImages } from '@productos/adapters/mergeProductsWithImages';
import { fetchProductList } from '@productos/services/fetchProductList';
import { fetchProductImageList } from '@productos/services/fetchProductImageList';
import { useState } from 'react';

export const useProductTable = () => {
    const [productImageList, setProductImageList] = useState({});

    const loadImages = async (params: Partial<LoadFunctionParams<Product>>) => {
        const { cursor = '0', filterText = '', signal } = params;

        const { data } = await fetchProductImageList({
            signal,
            params: {
                filterText,
                cursor: cursor,
                rowLimit: String(ROWS_PER_PAGE),
            },
            cache: 'no-store',
        });

        if (signal!.aborted) return;

        const adapted = productImageListAdapter(data);

        setProductImageList(adapted);
    };

    const table = useEntityTable<Product>({
        getData: async params => {
            const { filterText = '', cursor = '0', signal } = params;

            const response = await fetchProductList({
                signal,
                params: {
                    filterText,
                    cursor,
                    rowLimit: String(ROWS_PER_PAGE),
                },
                cache: 'no-store',
            });

            loadImages({ filterText, cursor, signal });

            const adaptedProductList = productListAdapter(response.data);

            const sortedProductList = adaptedProductList.sort((a, b) =>
                sortItems(
                    a,
                    b,
                    params.sortDescriptor || { column: 'name', direction: 'ascending' },
                ),
            );

            return { items: sortedProductList, total: response.total };
        },
        sort: ({ items, sortDescriptor }) => ({
            items: items.sort((first, second) => sortItems(first, second, sortDescriptor)),
        }),
    });

    const mergedItems = mergeProductsWithImages(table.list.items, productImageList);

    return { ...table, list: { ...table.list, items: mergedItems } };
};
