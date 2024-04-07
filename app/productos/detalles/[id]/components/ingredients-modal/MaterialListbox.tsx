import { materialListAdapter } from '@insumos/adapters/materialAdapter';
import { fetchMaterialList } from '@insumos/services/fetchMaterialList';
import { Listbox, ListboxItem, Selection } from '@nextui-org/react';
import IngredientsModalListboxWrapper from '@productos/detalles/[id]/components/ingredients-modal/IngredientsModalListboxWrapper';
import ListboxSkeleton from '@productos/detalles/[id]/components/ingredients-modal/ListboxSkeleton';
import { adaptQueryDataForListbox } from '@productos/utils/adaptQueryDataForListbox';
import { useState } from 'react';

function MaterialListbox() {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(''));

    return (
        <IngredientsModalListboxWrapper
            queryOptions={{
                queryKey: ['materials'],
                queryFn: async ({ pageParam }) => {
                    const response = await fetchMaterialList({
                        params: { cursor: String(pageParam) },
                    });
                    const adapted = materialListAdapter(response.data);

                    return {
                        items: adapted,
                        nextCursor: response.nextCursor,
                    };
                },
                initialPageParam: 0,
                getNextPageParam: lastPage => {
                    return lastPage.nextCursor;
                },
            }}
        >
            {query =>
                query.isPending ? (
                    <ListboxSkeleton />
                ) : (
                    query.data && (
                        <Listbox
                            items={adaptQueryDataForListbox(query.data)}
                            aria-label='Lista de insumos'
                            selectionMode='multiple'
                            selectedKeys={selectedKeys}
                            onSelectionChange={setSelectedKeys}
                        >
                            {material => (
                                <ListboxItem
                                    key={material.id}
                                    aria-label={material.name}
                                >
                                    <div className='w-full flex justify-between'>
                                        <p>{material.name}</p>
                                        <p>${material.price}</p>
                                    </div>
                                </ListboxItem>
                            )}
                        </Listbox>
                    )
                )
            }
        </IngredientsModalListboxWrapper>
    );
}

export default MaterialListbox;
