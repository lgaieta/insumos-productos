'use client';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { Tabs, Tab } from '@nextui-org/tabs';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchMaterials } from '@insumos/services/fetchMaterials';
import { fetchProducts } from '@productos/services/fetchProducts';
import Product from '@common/entities/Product';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { materialListAdapter } from '@insumos/adapters/materialAdapter';
import { getFlattenInfiniteData } from '@productos/utils/getFlattenInfiniteData';

function IngredientsModalWithButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const materialsQuery = useInfiniteQuery({
        queryKey: ['materials'],
        queryFn: async () => materialListAdapter((await fetchMaterials()).data),
        initialPageParam: 1,
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if (lastPage.length === 0) {
                return undefined;
            }
            return lastPageParam + 1;
        },
    });

    const productsQuery = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async () => (await fetchProducts()).data,
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
                scrollBehavior='inside'
            >
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader>Añadir ingredientes</ModalHeader>
                            <Divider />
                            <ModalBody className='max-h-[400px] overflow-y-scroll'>
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
                                                className='p-0'
                                                items={getFlattenInfiniteData(materialsQuery.data)}
                                            >
                                                {material => (
                                                    <ListboxItem key={material.id}>
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
                                                >
                                                    {product => (
                                                        <ListboxItem key={product.id}>
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
