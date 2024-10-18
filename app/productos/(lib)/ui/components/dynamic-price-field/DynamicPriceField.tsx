import type Ingredient from '@common/entities/Ingredient';
import type Material from '@common/entities/Material';
import Product from '@common/entities/Product';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Tab,
    Tabs,
    useDisclosure,
} from '@nextui-org/react';
import { MaterialsListSelector } from '@productos/(lib)/ui/components/dynamic-price-field/IngredientsTabLists';
import SelectedIngredientsList from '@productos/(lib)/ui/components/dynamic-price-field/SelectedIngredientsList';
import { useState } from 'react';

type DynamicPriceFieldProps = {
    selectedIngredients: Ingredient[];
    onSelectedIngredientsChange: (selectedIngredients: Ingredient[]) => void;
};

function DynamicPriceField(props: DynamicPriceFieldProps) {
    const { selectedIngredients, onSelectedIngredientsChange } = props;
    const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const { isOpen, onOpenChange, onOpen } = useDisclosure();

    return (
        <Card>
            <CardBody className='p-6 flex flex-col gap-5'>
                <Card shadow='sm'>
                    <CardHeader className='flex flex-col sm:flex-row gap-2 justify-between'>
                        <h2 className='text-lg font-bold'>Ingredientes</h2>
                        <Button
                            variant='flat'
                            onPress={onOpen}
                        >
                            Añadir ingredientes
                        </Button>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <SelectedIngredientsList
                            ingredients={selectedIngredients}
                            onRemoveIngredient={(ingredient: Ingredient) => {
                                onSelectedIngredientsChange(
                                    selectedIngredients.filter(i => i.id !== ingredient.id),
                                );
                            }}
                            onAmountChange={(ingredient, amount) => {
                                onSelectedIngredientsChange(
                                    selectedIngredients.map(i =>
                                        i.id === ingredient.id ? { ...ingredient, amount } : i,
                                    ),
                                );
                            }}
                        />
                    </CardBody>
                </Card>
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
                                                onSelectedMaterialsChange={setSelectedMaterials}
                                            />
                                        </Tab>
                                        <Tab
                                            key='product'
                                            title='Productos'
                                        ></Tab>
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
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <ProfitField />
                <PriceField />
            </CardBody>
        </Card>
    );
}

function PriceField() {
    return (
        <Input
            type='number'
            label='Costo'
            name='price'
            variant='bordered'
            placeholder='Ingrese el costo del producto'
            labelPlacement='outside'
            endContent={
                <div className='pointer-events-none flex items-center'>
                    <span className='text-foreground-400 text-base'>$</span>
                </div>
            }
            classNames={{ label: 'font-bold' }}
            size='lg'
        />
    );
}

function ProfitField() {
    return (
        <Input
            type='number'
            label='Ganancia'
            name='profit'
            variant='bordered'
            placeholder='Ingrese la ganancia del producto'
            labelPlacement='outside'
            endContent={
                <div className='pointer-events-none flex items-center'>
                    <span className='text-foreground-400 text-base'>%</span>
                </div>
            }
            classNames={{ label: 'font-bold' }}
            size='lg'
        />
    );
}

export default DynamicPriceField;
