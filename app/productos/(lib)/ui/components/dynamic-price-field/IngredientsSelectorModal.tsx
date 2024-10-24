import type Material from '@common/entities/Material';
import type Product from '@common/entities/Product';
import {
    Modal,
    ModalContent,
    ModalHeader,
    Divider,
    ModalBody,
    Tabs,
    Tab,
    ModalFooter,
    Button,
} from '@nextui-org/react';
import {
    MaterialsListSelector,
    ProductsListSelector,
} from '@productos/(lib)/ui/components/dynamic-price-field/IngredientsTabLists';

type IngredientsSelectorModalProps = {
    selectedMaterials: Material[];
    selectedProducts: Product[];
    onSelectedMaterialsChange: (materials: Material[]) => void;
    onSelectedProductsChange: (products: Product[]) => void;
    isOpen: boolean;
    onOpenChange: () => void;
    onSubmit: () => void;
};

function IngredientsSelectorModal(props: IngredientsSelectorModalProps) {
    const {
        selectedMaterials,
        onSelectedMaterialsChange,
        selectedProducts,
        onSelectedProductsChange,
        isOpen,
        onOpenChange,
        onSubmit,
    } = props;

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
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
                                    <MaterialsListSelector
                                        selectedMaterials={selectedMaterials}
                                        onSelectedMaterialsChange={onSelectedMaterialsChange}
                                    />
                                </Tab>
                                <Tab
                                    key='product'
                                    title='Productos'
                                >
                                    <ProductsListSelector
                                        selectedProducts={selectedProducts}
                                        onSelectedProductsChange={onSelectedProductsChange}
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
                                isDisabled={
                                    selectedMaterials.length === 0 && selectedProducts.length === 0
                                }
                                onPress={onSubmit}
                            >
                                Añadir ingredientes
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default IngredientsSelectorModal;
