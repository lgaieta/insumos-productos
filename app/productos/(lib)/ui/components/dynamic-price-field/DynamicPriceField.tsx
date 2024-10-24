import type Ingredient from '@common/entities/Ingredient';
import type Material from '@common/entities/Material';
import Product from '@common/entities/Product';
import {
    Button,
    Card,
    CardBody,
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
import IngredientsSelectorModal from '@productos/(lib)/ui/components/dynamic-price-field/IngredientsSelectorModal';
import {
    MaterialsListSelector,
    ProductsListSelector,
} from '@productos/(lib)/ui/components/dynamic-price-field/IngredientsTabLists';
import { mergeProductsWithMaterials } from '@productos/(lib)/ui/components/dynamic-price-field/mergeProductsWithMaterials';
import SelectedIngredients from '@productos/(lib)/ui/components/dynamic-price-field/SelectedIngredients';
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
                <SelectedIngredients
                    selectedIngredients={selectedIngredients}
                    onAddIngredientsClick={onOpen}
                    onRemoveIngredient={ingredient =>
                        onSelectedIngredientsChange(
                            selectedIngredients.filter(i => i.id !== ingredient.id),
                        )
                    }
                    onAmountChange={(ingredient, amount) => {
                        onSelectedIngredientsChange(
                            selectedIngredients.map(i =>
                                i.id === ingredient.id ? { ...ingredient, amount } : i,
                            ),
                        );
                    }}
                />
                <IngredientsSelectorModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    selectedMaterials={selectedMaterials}
                    onSelectedMaterialsChange={setSelectedMaterials}
                    selectedProducts={selectedProducts}
                    onSelectedProductsChange={setSelectedProducts}
                    onSubmit={() =>
                        onSelectedIngredientsChange(
                            Array.from(
                                new Set(
                                    selectedIngredients.concat(
                                        mergeProductsWithMaterials(
                                            selectedMaterials,
                                            selectedProducts,
                                        ),
                                    ),
                                ),
                            ),
                        )
                    }
                />
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
