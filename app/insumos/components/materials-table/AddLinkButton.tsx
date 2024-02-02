import Material from '@common/entities/Material';
import { editLinkServerAction } from '@insumos/actions/editLinkServerAction';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { MouseEventHandler, useState } from 'react';
import { useFormStatus } from 'react-dom';

function ConfirmButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            size='md'
            color='primary'
            type='submit'
            isLoading={pending}
            isDisabled={pending}
        >
            {pending ? 'Agregando' : 'Agregar'}
        </Button>
    );
}

function AddLinkButton(props: { materialId: Material['id'] }) {
    const [isInput, setIsInput] = useState(false);
    const [isError, setIsError] = useState<false | string>(false);

    const handleDefaultButtonClick = () => setIsInput(true);

    const handleFormClick: MouseEventHandler<HTMLFormElement> = e => e.stopPropagation();

    const editLinkAction = async (formData: FormData) => {
        const result = await editLinkServerAction(props.materialId, formData);
        if (result !== null) return setIsError(result);
        setIsInput(false);
    };

    if (isInput)
        return (
            <form
                className='flex items-center gap-2'
                action={editLinkAction}
                onClick={handleFormClick}
            >
                <Input
                    autoFocus
                    variant='bordered'
                    name='link'
                    size='sm'
                    className='max-w-56'
                    errorMessage={isError}
                    validationState={isError ? 'invalid' : 'valid'}
                />
                <ConfirmButton />
                <Button
                    size='md'
                    onPress={() => setIsInput(false)}
                >
                    Cancelar
                </Button>
            </form>
        );

    if (!isInput)
        return (
            <Button
                variant='flat'
                onPress={handleDefaultButtonClick}
            >
                Agregar link
            </Button>
        );
}

export default AddLinkButton;
