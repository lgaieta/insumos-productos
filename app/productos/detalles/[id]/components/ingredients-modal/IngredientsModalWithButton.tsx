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
import { useQuery } from '@tanstack/react-query';
import { fetchMaterials } from '@insumos/services/fetchMaterials';
import { fetchProducts } from '@productos/services/fetchProducts';
import Product from '@common/entities/Product';
import Material from '@common/entities/Material';
import { Listbox, ListboxItem } from '@nextui-org/listbox';

function IngredientsModalWithButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const materialsQuery = useQuery<Material[]>({
        queryKey: ['materials'],
        queryFn: async () => (await fetchMaterials()).data,
    });
    const productsQuery = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async () => (await fetchProducts()).data,
    });

    console.log(materialsQuery.data);

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
                                            <Listbox className='p-0'>
                                                {materialsQuery.data.map(material => (
                                                    <ListboxItem key={material.id}>
                                                        <div className='w-full flex justify-between'>
                                                            <p>{material.name}</p>
                                                            <p>${material.price}</p>
                                                        </div>
                                                    </ListboxItem>
                                                ))}
                                            </Listbox>
                                        )}
                                    </Tab>
                                    <Tab
                                        key='product'
                                        title='Productos'
                                    >
                                        Productos
                                    </Tab>
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
