import type Ingredient from '@common/entities/Ingredient';
import type Material from '@common/entities/Material';
import Product from '@common/entities/Product';
import { Card, CardBody, Input, useDisclosure } from '@nextui-org/react';
import IngredientsSelectorModal from '@productos/(lib)/ui/components/dynamic-price-field/IngredientsSelectorModal';
import { mergeProductsWithMaterials } from '@productos/(lib)/ui/components/dynamic-price-field/mergeProductsWithMaterials';
import { removeDuplicatedIngredients } from '@productos/(lib)/ui/components/dynamic-price-field/removeDuplicatedIngredients';
import SelectedIngredients from '@productos/(lib)/ui/components/dynamic-price-field/SelectedIngredients';
import { useEffect, useMemo, useState } from 'react';

type DynamicPriceFieldProps = {
    selectedIngredients: Ingredient[];
    onSelectedIngredientsChange: (selectedIngredients: Ingredient[]) => void;
};

function DynamicPriceField(props: DynamicPriceFieldProps) {
    const { selectedIngredients, onSelectedIngredientsChange } = props;
    const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

    const initialPrice = useMemo(
        () =>
            selectedIngredients.reduce(
                (acc, ingredient) => acc + ingredient.unitPrice * ingredient.amount,
                0,
            ),
        [selectedIngredients],
    );

    const [price, setPrice] = useState(initialPrice);
    const [profit, setProfit] = useState(0);

    const handlePriceChange = (value: number) => {
        const newPrice = Number(value);
        setPrice(newPrice);
        const newProfit = 100 * (newPrice / initialPrice - 1);
        setProfit(newProfit);
    };

    const handleProfitChange = (value: number) => {
        setProfit(Number(value));
        const newPrice = initialPrice * (1 + Number(value) / 100);
        setPrice(newPrice);
    };

    useEffect(() => {
        handleProfitChange(profit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIngredients]);

    return (
        <Card>
            <CardBody className='p-6 flex flex-col gap-5'>
                <SelectedIngredients
                    selectedIngredients={selectedIngredients}
                    onAddIngredientsClick={onOpen}
                    onRemoveIngredient={ingredient => {
                        onSelectedIngredientsChange(
                            selectedIngredients.filter(
                                i =>
                                    i.componentId !== ingredient.componentId &&
                                    i.type === ingredient.type,
                            ),
                        );
                    }}
                    onAmountChange={(ingredient, amount) => {
                        onSelectedIngredientsChange(
                            selectedIngredients.map(i =>
                                i.componentId === ingredient.componentId &&
                                i.type === ingredient.type
                                    ? { ...ingredient, amount: amount <= 0 ? 1 : amount }
                                    : i,
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
                    onSubmit={() => {
                        onSelectedIngredientsChange(
                            removeDuplicatedIngredients(
                                selectedIngredients.concat(
                                    mergeProductsWithMaterials(selectedMaterials, selectedProducts),
                                ),
                            ),
                        );
                        onClose();
                    }}
                />
                <p className='text-base'>Costo total de insumos: ${initialPrice}</p>
                <ProfitField
                    isDisabled={selectedIngredients.length < 1}
                    value={String(profit)}
                    onChange={value => handleProfitChange(+value)}
                />
                <PriceField
                    isDisabled={selectedIngredients.length < 1}
                    value={String(price)}
                    onChange={value => handlePriceChange(+value)}
                />
            </CardBody>
        </Card>
    );
}

function PriceField(props: {
    value: string;
    onChange: (value: string) => void;
    isDisabled: boolean;
}) {
    return (
        <Input
            type='number'
            label='Precio unitario'
            name='price'
            variant='bordered'
            placeholder='Ingrese el costo del producto'
            labelPlacement='outside'
            endContent={
                <div className='pointer-events-none flex items-center'>
                    <span className='text-foreground-400 text-base'>$</span>
                </div>
            }
            value={props.value}
            onChange={event => props.onChange(event.target.value)}
            classNames={{ label: 'font-bold' }}
            isDisabled={props.isDisabled}
            size='lg'
        />
    );
}

function ProfitField(props: {
    value: string;
    onChange: (value: string) => void;
    isDisabled: boolean;
}) {
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
            value={props.value}
            onChange={event => props.onChange(event.target.value)}
            classNames={{ label: 'font-bold' }}
            isDisabled={props.isDisabled}
            size='lg'
        />
    );
}

export default DynamicPriceField;
