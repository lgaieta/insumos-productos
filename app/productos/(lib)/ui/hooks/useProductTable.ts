import { ROWS_PER_PAGE } from '@common/constants';
import Product from '@common/entities/Product';
import { LoadFunctionParams, useEntityTable } from '@common/ui/hooks/useEntityTable';
import { sortItems } from '@common/utils/sortItems';
import { fetchProductList } from '@productos/(lib)/services/fetchProductList';
import { fetchProductImageList } from '@productos/(lib)/services/fetchProductImageList';
import { useState } from 'react';
import type Material from '@common/entities/Material';

const mergeProductsWithImages = (materials: Material[], images: { [id: number]: string }) =>
    materials.map(material => ({ ...material, image: images[material.id] || null }));

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

        const preparedList = data.map(item => ({
            id: item.id,
            image: `data:image/png;base64,${item.image}`,
        }));

        setProductImageList(preparedList);
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

            const sortedProductList = response.data.sort((a, b) =>
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
