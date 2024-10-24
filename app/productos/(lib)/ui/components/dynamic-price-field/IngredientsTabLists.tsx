import { fetchMaterialList } from '@insumos/(lib)/services/fetchMaterialList';
import { Listbox, ListboxItem, type Selection } from '@nextui-org/react';
import ListboxSkeleton from '@productos/(lib)/ui/components/ingredients-modal/ListboxSkeleton';
import { adaptQueryDataForListbox } from '@productos/(lib)/utils/adaptQueryDataForListbox';
import { Spinner } from '@nextui-org/react';
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ReactNode, RefObject } from 'react';
import type Material from '@common/entities/Material';
import type Product from '@common/entities/Product';
import { fetchProductList } from '@productos/(lib)/services/fetchProductList';

type MaterialsListSelectorProps = {
    selectedMaterials: Material[];
    onSelectedMaterialsChange: (materials: Material[]) => void;
};

export function MaterialsListSelector(props: MaterialsListSelectorProps) {
    const selectedKeys = new Set(props.selectedMaterials.map(i => i.id));

    const handleSelectionChange = (selection: Selection, data: Material[]) => {
        if (selection === 'all') return data;
        props.onSelectedMaterialsChange(data.filter(material => selection.has(material.id)));
    };

    return (
        <PaginationWrapper
            queryOptions={{
                queryKey: ['materials'],
                queryFn: async ({ pageParam }) => {
                    const response = await fetchMaterialList({
                        params: { cursor: String(pageParam) },
                    });

                    return {
                        items: response.data,
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
                            onSelectionChange={selection =>
                                handleSelectionChange(
                                    selection,
                                    adaptQueryDataForListbox(query.data),
                                )
                            }
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
        </PaginationWrapper>
    );
}

type ProductsListSelectorProps = {
    selectedProducts: Product[];
    onSelectedProductsChange: (materials: Product[]) => void;
};

export function ProductsListSelector(props: ProductsListSelectorProps) {
    const selectedKeys = new Set(props.selectedProducts.map(i => i.id));

    const handleSelectionChange = (selection: Selection, data: Product[]) => {
        if (selection === 'all') return data;
        props.onSelectedProductsChange(data.filter(product => selection.has(product.id)));
    };

    return (
        <PaginationWrapper
            queryOptions={{
                queryKey: ['products'],
                queryFn: async ({ pageParam }) => {
                    const response = await fetchProductList({
                        params: { cursor: String(pageParam) },
                    });

                    return {
                        items: response.data,
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
                            selectedKeys={selectedKeys}
                            onSelectionChange={selection => {
                                handleSelectionChange(
                                    selection,
                                    adaptQueryDataForListbox(query.data),
                                );
                            }}
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
        </PaginationWrapper>
    );
}

type PaginationWrapperProps<Data> = {
    queryOptions: Parameters<typeof useInfiniteQuery<Data>>[0];
    children: (props: ReturnType<typeof useInfiniteQuery<Data>>) => ReactNode;
};

function PaginationWrapper<Data>(props: PaginationWrapperProps<Data>) {
    const query = useInfiniteQuery(props.queryOptions);

    const [loaderRef, scrollerRef] = useInfiniteScroll({
        onLoadMore: query.fetchNextPage,
        hasMore: query.hasNextPage,
    }) as [RefObject<HTMLDivElement>, RefObject<HTMLDivElement>];

    return (
        <div
            className='flex flex-col p-0 max-h-[50vh] overflow-y-scroll'
            ref={scrollerRef}
        >
            {props.children(query)}
            <div
                className={`flex items-center justify-center ${query.hasNextPage ? 'p-4' : ''}`}
                ref={loaderRef}
            >
                {query.hasNextPage && <Spinner />}
            </div>
        </div>
    );
}
