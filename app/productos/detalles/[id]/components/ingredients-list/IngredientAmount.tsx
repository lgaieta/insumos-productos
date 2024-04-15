import Ingredient from '@common/entities/Ingredient';
import Product from '@common/entities/Product';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/react';
import { editIngredientAmountServerAction } from '@productos/actions/editIngredientAmountServerAction';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import { useDebouncedCallback } from 'use-debounce';

type IngredientAmountProps = {
    defaultValue: number;
    ingredientId: Ingredient['id'];
};

const isNumeric = (str: string) => /^[+-]?\d+(\.\d+)?$/.test(str);

function IngredientAmount(props: IngredientAmountProps) {
    const [value, setValue] = useState<number>(props.defaultValue);

    const pathname = usePathname();
    const productId: Product['id'] = parseInt(pathname.split('/').slice(-1)[0]);

    const handleInputChange = (value: string) => {
        if (isNumeric(value) || value === '') setValue(Number(value));
    };

    const debouncedAction = useDebouncedCallback(editIngredientAmountServerAction, 400);

    const action = () => {
        debouncedAction({
            newAmount: value,
            ingredientId: props.ingredientId,
            productId,
        });
    };

    const handleRemoveButtonPress = () => {
        setValue(value - 1 > 1 ? value - 1 : 1);
        debouncedAction({
            newAmount: value - 1 > 1 ? value - 1 : 1,
            ingredientId: props.ingredientId,
            productId,
        });
    };

    const handleAddButtonPress = () => {
        setValue(value + 1);
        debouncedAction({
            newAmount: value + 1,
            ingredientId: props.ingredientId,
            productId,
        });
    };

    return (
        <form
            action={action}
            className='flex items-center gap-2'
        >
            <Button
                isIconOnly
                size='sm'
                onPress={handleRemoveButtonPress}
            >
                <AiOutlineMinus size={20} />
            </Button>
            <Input
                name='amount'
                variant='bordered'
                size='sm'
                aria-label='Cantidad de ingredientes'
                value={String(value)}
                labelPlacement='outside'
                classNames={{
                    base: 'w-12',
                    input: 'text-center',
                }}
                onValueChange={handleInputChange}
            />
            <Button
                isIconOnly
                size='sm'
                onPress={handleAddButtonPress}
            >
                <AiOutlinePlus size={20} />
            </Button>
        </form>
    );
}

export default IngredientAmount;
