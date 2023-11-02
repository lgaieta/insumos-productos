import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';

function NotFoundPage() {
    return (
        <main className='flex flex-col items-center justify-center w-full mt-12 px-8 gap-6'>
            <h1 className='text-2xl text-center font-bold'>
                La página que estás buscando <strong className='text-danger'>no existe</strong>
            </h1>
            <p className='text-center max-w-[550px]'>
                En caso de haber llegado aquí desde alguna acción de la aplicación, notificarlo al
                personal de{' '}
                <Link
                    as={NextLink}
                    href='https://wa.me/5491126547481'
                >
                    Aieta Consulting
                </Link>
            </p>
            <Button
                as={NextLink}
                href='/'
                color='primary'
                size='lg'
            >
                Volver al inicio
            </Button>
            <Button
                as={NextLink}
                href='https://wa.me/5491126547481'
                color='primary'
                variant='light'
                size='lg'
            >
                Enviar reporte
            </Button>
        </main>
    );
}

export default NotFoundPage;
