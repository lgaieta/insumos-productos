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
import { Selection } from '@nextui-org/react';
import MaterialListbox from '@productos/detalles/[id]/components/ingredients-modal/MaterialListbox';
import ProductListbox from '@productos/detalles/[id]/components/ingredients-modal/ProductListbox';
import { useState } from 'react';

function IngredientsModalWithButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedMaterials, setSelectedMaterials] = useState<Selection>(new Set(''));
    const [selectedProducts, setSelectedProducts] = useState<Selection>(new Set(''));

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
                                        <MaterialListbox
                                            selectedKeys={selectedMaterials}
                                            setSelectedKeys={setSelectedMaterials}
                                        />
                                    </Tab>
                                    <Tab
                                        key='product'
                                        title='Productos'
                                    >
                                        <ProductListbox
                                            selectedKeys={selectedProducts}
                                            setSelectedKeys={setSelectedProducts}
                                        />
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
