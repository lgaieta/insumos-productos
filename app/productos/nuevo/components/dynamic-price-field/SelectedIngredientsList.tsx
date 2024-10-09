import type Ingredient from '@common/entities/Ingredient';
import IngredientType from '@common/entities/IngredientType';
import { Button, Input } from '@nextui-org/react';
import type { ReactNode } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

export default function SelectedIngredientsList(props: {
    ingredients: Ingredient[];
    onRemoveIngredient: (ingredient: Ingredient) => void;
    onAmountChange: (ingredient: Ingredient, amount: number) => void;
}) {
    return (
        <div className='grid grid-cols-1 min-[500px]:grid-cols-2 gap-2'>
            {props.ingredients.map(ingredient => (
                <IngredientCard key={ingredient.id}>
                    <IngredientName ingredient={ingredient} />
                    <IngredientPrice ingredient={ingredient} />
                    <IngredientAmount
                        ingredient={ingredient}
                        onAmountChange={props.onAmountChange}
                    />
                    <RemoveButton
                        ingredient={ingredient}
                        onRemove={props.onRemoveIngredient}
                    />
                </IngredientCard>
            ))}
        </div>
    );
}

function IngredientCard(props: { children: ReactNode }) {
    return (
        <div className='flex flex-col items-center text-center justify-between p-4 border border-default-300 rounded-large w-full gap-2'>
            {props.children}
        </div>
    );
}

function IngredientName(props: { ingredient: Ingredient }) {
    return (
        <span className='flex flex-col'>
            <p className='font-bold'>{props.ingredient.componentName}</p>
            <p className='text-sm text-default-500'>
                {props.ingredient.type === IngredientType.Material ? 'Insumo' : 'Producto'}
            </p>
        </span>
    );
}

function IngredientPrice(props: { ingredient: Ingredient }) {
    return <div>${props.ingredient.unitPrice}</div>;
}

function IngredientAmount(props: {
    ingredient: Ingredient;
    onAmountChange: (ingredient: Ingredient, amount: number) => void;
}) {
    return (
        <div className='flex items-center gap-2'>
            <Button
                isIconOnly
                size='sm'
                onPress={() =>
                    props.onAmountChange(props.ingredient, Math.max(props.ingredient.amount - 1))
                }
                isDisabled={props.ingredient.amount <= 1}
            >
                <AiOutlineMinus size={20} />
            </Button>
            <Input
                variant='bordered'
                size='sm'
                aria-label='Cantidad de ingrediente'
                labelPlacement='outside'
                value={String(props.ingredient.amount)}
                onValueChange={value => props.onAmountChange(props.ingredient, Number(value))}
                classNames={{
                    base: 'w-12',
                    input: 'text-center',
                }}
            />
            <Button
                isIconOnly
                size='sm'
                onPress={() => props.onAmountChange(props.ingredient, props.ingredient.amount + 1)}
            >
                <AiOutlinePlus size={20} />
            </Button>
        </div>
    );
}

function RemoveButton(props: {
    ingredient: Ingredient;
    onRemove: (ingredient: Ingredient) => void;
}) {
    return (
        <Button
            onPress={() => props.onRemove(props.ingredient)}
            className='w-full'
            variant='flat'
        >
            Eliminar
        </Button>
    );
}
