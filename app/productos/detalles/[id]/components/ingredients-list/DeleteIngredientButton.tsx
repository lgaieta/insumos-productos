import Ingredient from '@common/entities/Ingredient';
import Product from '@common/entities/Product';
import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/spinner';
import { Tooltip } from '@nextui-org/tooltip';
import { deleteIngredientServerAction } from '@productos/(lib)/actions/deleteIngredientServerAction';
import { usePathname } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { FaTrashAlt } from 'react-icons/fa';

function DeleteButton() {
    const { pending } = useFormStatus();

    return (
        <Tooltip
            content='Borrar ingrediente'
            color='danger'
            delay={750}
        >
            <Button
                variant='light'
                className='data-[hover=true]:bg-default-300'
                radius='lg'
                isIconOnly
                type='submit'
                isDisabled={pending}
                color='danger'
            >
                {pending ? (
                    <Spinner classNames={{ wrapper: 'w-6 h-6' }} />
                ) : (
                    <FaTrashAlt
                        size={20}
                        color='#f31260'
                    />
                )}
            </Button>
        </Tooltip>
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
