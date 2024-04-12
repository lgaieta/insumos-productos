import Ingredient from '@common/entities/Ingredient';
import Product from '@common/entities/Product';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/react';
import { editIngredientAmountServerAction } from '@productos/actions/editIngredientAmountServerAction';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';

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
        if (isNumeric(value)) setValue(Number(value));
    };

    const handleRemoveButton = () => setValue(value - 1 > 1 ? value - 1 : 1);

    const handleAddButton = () => setValue(value + 1);

    const action = editIngredientAmountServerAction.bind(null, {
        newAmount: value,
        ingredientId: props.ingredientId,
        productId,
    });

    return (
        <form
            action={action}
            className='flex items-center gap-2'
        >
            <Button
                isIconOnly
                size='sm'
                onPress={handleRemoveButton}
                type='submit'
            >
                <AiOutlineMinus size={20} />
            </Button>
            <Input
                variant='bordered'
                size='sm'
                classNames={{
                    inputWrapper: 'max-h-6 bg-background',
                    base: 'w-12',
                    label: 'hidden',
                    input: 'text-center',
                }}
                label='Cantidad'
                value={String(value)}
                onValueChange={handleInputChange}
                min={1}
            />
            <Button
                isIconOnly
                size='sm'
                onPress={handleAddButton}
                type='submit'
            >
                <AiOutlinePlus size={20} />
            </Button>
        </form>
    );
}

export default IngredientAmount;
