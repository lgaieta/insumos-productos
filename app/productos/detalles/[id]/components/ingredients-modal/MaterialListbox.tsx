import { materialListAdapter } from '@insumos/(lib)/adapters/materialAdapter';
import { fetchMaterialList } from '@insumos/(lib)/services/fetchMaterialList';
import { Listbox, ListboxItem, Selection } from '@nextui-org/react';
import IngredientsModalPaginationWrapper from '@productos/detalles/[id]/components/ingredients-modal/IngredientsModalPaginationWrapper';
import ListboxSkeleton from '@productos/detalles/[id]/components/ingredients-modal/ListboxSkeleton';
import { adaptQueryDataForListbox } from '@productos/(lib)/utils/adaptQueryDataForListbox';
import { Key } from 'react-stately';

type MaterialListboxProps = {
    selectedKeys: 'all' | Iterable<Key> | undefined;
    setSelectedKeys: (keys: Selection) => any;
};

function MaterialListbox(props: MaterialListboxProps) {
    return (
        <IngredientsModalPaginationWrapper
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
                            selectedKeys={props.selectedKeys}
                            onSelectionChange={props.setSelectedKeys}
                        >
                            {material => (
                                <ListboxItem
                                    key={material.id}
                                    aria-label={material.name}
                                    textValue={material.name}
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
        </IngredientsModalPaginationWrapper>
    );
}

export default MaterialListbox;
