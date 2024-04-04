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
import { fetchMaterialList } from '@insumos/services/fetchMaterialList';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { materialListAdapter } from '@insumos/adapters/materialAdapter';
import { adaptQueryDataForListbox } from '@productos/utils/adaptQueryDataForListbox';
import IngredientsModalListboxWrapper from '@productos/detalles/[id]/components/ingredients-modal/IngredientsModalListboxWrapper';
import { useInfiniteQuery } from '@tanstack/react-query';
import MaterialListbox from '@productos/detalles/[id]/components/ingredients-modal/MaterialListbox';
import ProductListbox from '@productos/detalles/[id]/components/ingredients-modal/ProductListbox';

function IngredientsModalWithButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                                        <MaterialListbox />
                                    </Tab>
                                    <Tab
                                        key='product'
                                        title='Productos'
                                    >
                                        <ProductListbox />
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
