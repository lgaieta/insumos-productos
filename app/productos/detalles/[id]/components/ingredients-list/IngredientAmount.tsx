import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/react';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';

type IngredientAmountProps = {
    defaultValue: number;
};

const isNumeric = (str: string) => /^[+-]?\d+(\.\d+)?$/.test(str);

function IngredientAmount(props: IngredientAmountProps) {
    const [value, setValue] = useState<number>(props.defaultValue);

    const handleInputChange = (value: string) => {
        if (isNumeric(value)) setValue(Number(value));
    };

    const handleRemoveButton = () => setValue(value - 1 > 1 ? value - 1 : 1);

    const handleAddButton = () => setValue(value + 1);

    return (
        <div className='flex items-center gap-2'>
            <Button
                isIconOnly
                size='sm'
                onPress={handleRemoveButton}
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
            >
                <AiOutlinePlus size={20} />
            </Button>
        </div>
    );
}

export default IngredientAmount;
