import Ingredient from '@common/entities/Ingredient';
import { Button } from '@nextui-org/button';
import { deleteIngredientServerAction } from '@productos/actions/deleteIngredientServerAction';
import { IoMdClose } from 'react-icons/io';

function DeleteIngredientButton(props: { ingredientId: Ingredient['id'] }) {
    const action = deleteIngredientServerAction.bind(null, props.ingredientId);

    return (
        <form action={action}>
            <Button
                variant='light'
                className='data-[hover=true]:bg-default-300'
                radius='full'
                isIconOnly
                type='submit'
            >
                <IoMdClose
                    size={24}
                    color='#11181C'
                />
            </Button>
        </form>
    );
}

export default DeleteIngredientButton;
