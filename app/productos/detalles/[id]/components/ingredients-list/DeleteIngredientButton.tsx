import Ingredient from '@common/entities/Ingredient';
import Product from '@common/entities/Product';
import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/react';
import { deleteIngredientServerAction } from '@productos/actions/deleteIngredientServerAction';
import { usePathname } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { IoMdClose } from 'react-icons/io';

function DeleteButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            variant='light'
            className='data-[hover=true]:bg-default-300'
            radius='full'
            isIconOnly
            type='submit'
            isDisabled={pending}
        >
            {pending ? (
                <Spinner classNames={{ wrapper: 'w-6 h-6' }} />
            ) : (
                <IoMdClose
                    size={24}
                    color='#11181C'
                />
            )}
        </Button>
    );
}

function DeleteIngredientButton(props: { ingredientId: Ingredient['id'] }) {
    const pathname = usePathname();
    const productId: Product['id'] = parseInt(pathname.split('/').slice(-1)[0]);

    const action = async () => await deleteIngredientServerAction(props.ingredientId, productId);

    return (
        <form action={action}>
            <DeleteButton />
        </form>
    );
}

export default DeleteIngredientButton;
