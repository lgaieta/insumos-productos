import { Button } from '@nextui-org/button';
import NextLink from 'next/link';

function ProductNotFoundErrorPage() {
    return (
        <main className='flex flex-col items-center justify-center w-full mt-12 px-8 gap-6'>
            <h1 className='text-2xl text-center font-bold'>
                Parece que el producto que está buscando{' '}
                <strong className='text-danger'>no existe</strong>.
            </h1>
            <Button
                as={NextLink}
                href='/productos'
                color='primary'
                variant='light'
                size='lg'
            >
                Volver a la lista de productos
            </Button>
        </main>
    );
}

export default ProductNotFoundErrorPage;
