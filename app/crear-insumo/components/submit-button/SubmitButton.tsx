import { Button } from '@nextui-org/button';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            color='primary'
            size='lg'
            type='submit'
            isLoading={pending}
        >
            {pending ? 'Cargando...' : 'Continuar'}
        </Button>
    );
}

export default SubmitButton;
