'use client';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { Tabs, Tab } from '@nextui-org/tabs';
import MaterialListbox from '@productos/detalles/[id]/components/ingredients-modal/MaterialListbox';
import ProductListbox from '@productos/detalles/[id]/components/ingredients-modal/ProductListbox';
import { useState } from 'react';
import { Key } from 'react-stately';
import { ModalProps } from '@nextui-org/react';

function IngredientsModal(props: Omit<ModalProps, 'children'>) {
    const [selectedMaterials, setSelectedMaterials] = useState<Set<Key>>(new Set());
    const [selectedProducts, setSelectedProducts] = useState<Set<Key>>(new Set());

    const totalCount = selectedMaterials.size + selectedProducts.size;

    return (
        <>
            <Modal
                classNames={{
                    header: 'flex items-center justify-between p-4',
                    body: 'p-4',
                }}
                {...props}
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
                                            setSelectedKeys={keys =>
                                                setSelectedMaterials(prev =>
                                                    keys === 'all' ? prev : keys,
                                                )
                                            }
                                        />
                                    </Tab>
                                    <Tab
                                        key='product'
                                        title='Productos'
                                    >
                                        <ProductListbox
                                            selectedKeys={selectedProducts}
                                            setSelectedKeys={keys =>
                                                setSelectedProducts(prev =>
                                                    keys === 'all' ? prev : keys,
                                                )
                                            }
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
                                <Button
                                    color='primary'
                                    isDisabled={totalCount < 1}
                                >
                                    {totalCount > 0
                                        ? `Añadir ${totalCount} ingredientes`
                                        : 'Añadir ingredientes'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default IngredientsModal;
