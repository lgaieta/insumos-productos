import { Button } from '@nextui-org/button';
import Link from 'next/link';

function NewMaterialButton() {
    return (
        <Button
            color='primary'
            as={Link}
            href='/insumos/nuevo'
            className='w-full sm:w-fit'
        >
            Nuevo Insumo
        </Button>
    );
}

export default NewMaterialButton;
