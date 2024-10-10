import { Button } from '@nextui-org/button';
import Link from 'next/link';

function NewMaterialButton() {
    return (
        <Button
            as={Link}
            href='/insumos/nuevo'
            className='w-full min-[700px]:w-fit max-w-[276px]'
        >
            Nuevo Insumo
        </Button>
    );
}

export default NewMaterialButton;
