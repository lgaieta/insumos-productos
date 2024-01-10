import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';

function MaterialNotFoundErrorPage() {
    return (
        <main className='flex flex-col items-center justify-center w-full mt-12 px-8 gap-6'>
            <h1 className='text-2xl text-center font-bold'>
                Parece que el insumo que está buscando{' '}
                <strong className='text-danger'>no existe</strong>.
            </h1>
            <Button
                as={NextLink}
                href='/'
                color='primary'
                variant='light'
                size='lg'
            >
                Volver a la lista de insumos
            </Button>
        </main>
    );
}

export default MaterialNotFoundErrorPage;
