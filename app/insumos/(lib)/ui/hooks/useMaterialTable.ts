import { ROWS_PER_PAGE } from '@common/constants';
import Material from '@common/entities/Material';
import { LoadFunctionParams, useEntityTable } from '@common/ui/hooks/useEntityTable';
import { sortItems } from '@common/utils/sortItems';
import { fetchMaterialList } from '@insumos/(lib)/services/fetchMaterialList';
import { fetchMaterialImageList } from '@insumos/(lib)/services/fetchMaterialImageList';
import { useState } from 'react';

const mergeMaterialsWithImages = (materials: Material[], images: { [id: number]: string }) =>
    materials.map(material => ({ ...material, image: images[material.id] || null }));

export const useMaterialTable = () => {
    const [materialImageList, setMaterialImageList] = useState({});

    const loadImages = async (params: Partial<LoadFunctionParams<Material>>) => {
        const { cursor = '0', filterText = '', signal } = params;

        const { data } = await fetchMaterialImageList({
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

        setMaterialImageList(preparedList);
    };

    const table = useEntityTable<Material>({
        getData: async params => {
            const { filterText = '', cursor = '0', signal } = params;

            const response = await fetchMaterialList({
                signal,
                params: {
                    filterText,
                    cursor,
                    rowLimit: String(ROWS_PER_PAGE),
                },
                cache: 'no-store',
            });

            loadImages({ filterText, cursor, signal });

            const sortedMaterialList = response.data.sort((a, b) =>
                sortItems(
                    a,
                    b,
                    params.sortDescriptor || { column: 'name', direction: 'ascending' },
                ),
            );

            return { items: sortedMaterialList, total: response.total };
        },
        sort: ({ items, sortDescriptor }) => ({
            items: items.sort((first, second) => sortItems(first, second, sortDescriptor)),
        }),
    });

    const mergedItems = mergeMaterialsWithImages(table.list.items, materialImageList);

    return { ...table, list: { ...table.list, items: mergedItems } };
};
