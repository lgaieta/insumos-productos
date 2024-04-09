import Ingredient from '@common/entities/Ingredient';
import { Button } from '@nextui-org/button';
import { IoMdClose } from 'react-icons/io';

function DeleteIngredientButton(props: { ingredientId: Ingredient['id'] }) {
    return (
        <form>
            <Button
                variant='light'
                className='data-[hover=true]:bg-foreground-300'
                radius='full'
                isIconOnly
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
