import { Button } from '@nextui-org/button';
import { ButtonHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';

type DeleteButtonProps = {
    isEditing: boolean;
    onPress: () => void;
};

function DeleteButton(props: DeleteButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button
            color='danger'
            onPress={props.onPress}
            isLoading={pending && !props.isEditing}
            isDisabled={pending}
        >
            {pending && !props.isEditing ? 'Borrando' : 'Borrar'}
        </Button>
    );
}

export default DeleteButton;
