import type Ingredient from '@common/entities/Ingredient';
import { Input } from '@nextui-org/react';

type DynamicPriceFieldProps = {
    selectedIngredients: Ingredient[];
    onSelectedIngredientsChange: (selectedIngredients: Ingredient[]) => void;
};

function DynamicPriceField(props: DynamicPriceFieldProps) {
    return (
        <>
            <ProfitField />
            <PriceField />
        </>
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
