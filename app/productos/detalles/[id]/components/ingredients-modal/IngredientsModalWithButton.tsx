'use client';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@nextui-org/modal';
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';
import { Spinner } from '@nextui-org/spinner';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { Tabs, Tab } from '@nextui-org/tabs';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchMaterialList } from '@insumos/services/fetchMaterialList';
import { fetchProductList } from '@productos/services/fetchProductList';
import Product from '@common/entities/Product';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { materialListAdapter } from '@insumos/adapters/materialAdapter';
import { getFlattenInfiniteData } from '@productos/utils/getFlattenInfiniteData';
import { useEffect } from 'react';

function IngredientsModalWithButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const materialsQuery = useInfiniteQuery({
        queryKey: ['materials'],
        queryFn: async ({ pageParam }) =>
            materialListAdapter((await fetchMaterialList({ page: pageParam })).data),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.length === 0) {
                return undefined;
            }
            return lastPageParam + 1;
        },
    });

    // const [loaderRef, scrollerRef] = useInfiniteScroll({
    //     hasMore: materialsQuery.hasNextPage,
    //     onLoadMore: () => {
    //         console.log('loaded more');
    //         materialsQuery.fetchNextPage();
    //     },
    //     distance: 50,
    // });

    const productsQuery = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async () => (await fetchProductList()).data,
    });

    return (
        <>
            <Button
                variant='flat'
                onPress={onOpen}
            >
                Añadir ingrediente
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    header: 'flex items-center justify-between p-4',
                    body: 'p-4',
                }}
            >
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader>Añadir ingredientes</ModalHeader>
                            <Divider />
                            <ModalBody>
                                <Tabs
                                    aria-label='Options'
                                    fullWidth
                                >
                                    <Tab
                                        key='material'
                                        title='Insumos'
                                    >
                                        {materialsQuery.data && (
                                            <Listbox
                                                // ref={scrollerRef}
                                                // bottomContent={
                                                //     materialsQuery.hasNextPage ? (
                                                //         <div className='flex w-full justify-center h-32 bg-red'>
                                                //             <Spinner ref={loaderRef} />
                                                //         </div>
                                                //     ) : null
                                                // }
                                                bottomContent={
                                                    <Button
                                                        className='overflow-visible'
                                                        onPress={() => {
                                                            if (materialsQuery.hasNextPage)
                                                                materialsQuery.fetchNextPage();
                                                        }}
                                                    >
                                                        Cargar más
                                                    </Button>
                                                }
                                                classNames={{
                                                    base: 'flex flex-col p-0 max-h-[200px] overflow-y-scroll',
                                                }}
                                                items={getFlattenInfiniteData(materialsQuery.data)}
                                                aria-label='Lista de insumos'
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
                                        )}
                                    </Tab>
                                    {productsQuery.data && (
                                        <Tab
                                            key='product'
                                            title='Productos'
                                        >
                                            {productsQuery.data && (
                                                <Listbox
                                                    className='p-0'
                                                    items={productsQuery.data}
                                                    aria-label='Lista de productos'
                                                >
                                                    {product => (
                                                        <ListboxItem
                                                            key={product.id}
                                                            title={product.name}
                                                        >
                                                            <div className='w-full flex justify-between'>
                                                                <p>{product.name}</p>
                                                                <p>${product.price}</p>
                                                            </div>
                                                        </ListboxItem>
                                                    )}
                                                </Listbox>
                                            )}
                                        </Tab>
                                    )}
                                </Tabs>
                            </ModalBody>
                            <Divider />
                            <ModalFooter className='p-2'>
                                <Button
                                    color='danger'
                                    variant='light'
                                    onPress={onClose}
                                >
                                    Cerrar
                                </Button>
                                <Button color='primary'>Añadir</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default IngredientsModalWithButton;
