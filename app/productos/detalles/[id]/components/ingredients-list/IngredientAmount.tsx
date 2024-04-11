import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';

function IngredientAmount() {
    return (
        <div className='flex items-center gap-2'>
            <Button
                isIconOnly
                size='sm'
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
                defaultValue='1'
                min={1}
            />
            <Button
                isIconOnly
                size='sm'
            >
                <AiOutlinePlus size={20} />
            </Button>
        </div>
    );
}

export default IngredientAmount;
