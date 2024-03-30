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
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMaterialList } from '@insumos/services/fetchMaterialList';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { materialListAdapter } from '@insumos/adapters/materialAdapter';
import { adaptQueryDataForListbox } from '@productos/utils/adaptQueryDataForListbox';

function IngredientsModalWithButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const materialsQuery = useInfiniteQuery({
        queryKey: ['materials'],
        queryFn: async ({ pageParam }) => {
            const response = await fetchMaterialList({ params: { cursor: String(pageParam) } });
            const adapted = materialListAdapter(response.data);

            console.log(response);

            return { items: adapted, nextCursor: response.nextCursor };
        },
        initialPageParam: 0,
        getNextPageParam: lastPage => {
            console.log(lastPage.nextCursor);
            return lastPage.nextCursor;
        },
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
                                                bottomContent={
                                                    <Button
                                                        className='overflow-visible'
                                                        onPress={() => {
                                                            if (materialsQuery.hasNextPage)
                                                                materialsQuery.fetchNextPage();
                                                        }}
                                                        isDisabled={!materialsQuery.hasNextPage}
                                                    >
                                                        Cargar más
                                                    </Button>
                                                }
                                                classNames={{
                                                    base: 'flex flex-col p-0 max-h-[200px] overflow-y-scroll',
                                                }}
                                                items={adaptQueryDataForListbox(
                                                    materialsQuery.data,
                                                )}
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
                                    {/*productsQuery.data && (
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
                                                    )*/}
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
