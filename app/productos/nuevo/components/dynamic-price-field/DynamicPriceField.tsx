import type Ingredient from '@common/entities/Ingredient';
import IngredientType from '@common/entities/IngredientType';
import { Button, Card, CardBody, CardHeader, Divider, Input } from '@nextui-org/react';
import SelectedIngredientsList from '@productos/nuevo/components/dynamic-price-field/SelectedIngredientsList';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { MdClear } from 'react-icons/md';
import { useDebouncedCallback } from 'use-debounce';

type DynamicPriceFieldProps = {
    selectedIngredients: Ingredient[];
    onSelectedIngredientsChange: (selectedIngredients: Ingredient[]) => void;
};

function DynamicPriceField(props: DynamicPriceFieldProps) {
    const { selectedIngredients, onSelectedIngredientsChange } = props;

    return (
        <Card>
            <CardBody className='p-6 flex flex-col gap-5'>
                <Card shadow='sm'>
                    <CardHeader className='flex flex-col sm:flex-row gap-2 justify-between'>
                        <h2 className='text-lg font-bold'>Ingredientes</h2>
                        <Button variant='flat'>Añadir ingredientes</Button>
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
