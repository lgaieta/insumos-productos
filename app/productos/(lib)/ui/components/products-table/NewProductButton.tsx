import { Button } from '@nextui-org/button';
import Link from 'next/link';

function NewProductButton() {
    return (
        <Button
            as={Link}
            href='/productos/nuevo'
            className='w-full min-[700px]:w-fit max-w-[276px]'
        >
            Nuevo Producto
        </Button>
    );
}

export default NewProductButton;
