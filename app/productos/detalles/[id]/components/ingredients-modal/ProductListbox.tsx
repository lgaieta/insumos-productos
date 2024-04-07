import { productListAdapter } from '@productos/adapters/productAdapter';
import { fetchProductList } from '@productos/services/fetchProductList';
import { Listbox, ListboxItem, Selection } from '@nextui-org/react';
import IngredientsModalPaginationWrapper from '@productos/detalles/[id]/components/ingredients-modal/IngredientsModalPaginationWrapper';
import { adaptQueryDataForListbox } from '@productos/utils/adaptQueryDataForListbox';
import ListboxSkeleton from '@productos/detalles/[id]/components/ingredients-modal/ListboxSkeleton';
import { Key } from 'react-stately';

type ProductListboxProps = {
    selectedKeys: 'all' | Iterable<Key> | undefined;
    setSelectedKeys: (keys: Selection) => any;
};

function ProductListbox(props: ProductListboxProps) {
    return (
        <IngredientsModalPaginationWrapper
            queryOptions={{
                queryKey: ['products'],
                queryFn: async ({ pageParam }) => {
                    const response = await fetchProductList({
                        params: { cursor: String(pageParam) },
                    });
                    const adapted = productListAdapter(response.data);

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
                            aria-label='Lista de productos'
                            selectionMode='multiple'
                            selectedKeys={props.selectedKeys}
                            onSelectionChange={props.setSelectedKeys}
                        >
                            {product => (
                                <ListboxItem
                                    key={product.id}
                                    aria-label={product.name}
                                    textValue={product.name}
                                >
                                    <div className='w-full flex justify-between'>
                                        <p>{product.name}</p>
                                        <p>${product.price}</p>
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

export default ProductListbox;
