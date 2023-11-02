'use client';

import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import { useEffect } from 'react';

function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className='flex flex-col items-center justify-center w-full mt-12 px-8 gap-6'>
            <h1 className='text-2xl text-center font-bold'>
                Ha ocurrido un <strong className='text-danger'>error</strong> al intentar realizar
                una acción
            </h1>
            <p className='text-center max-w-[550px]'>
                Pruebe reintentando la acción. Si el error persiste, contactar a{' '}
                <Link
                    as={NextLink}
                    href='https://wa.me/5491126547481'
                >
                    Aieta Consulting
                </Link>
            </p>
            <Button
                color='primary'
                size='lg'
                onPress={() => reset()}
            >
                Reintentar
            </Button>
            <Button
                as={NextLink}
                href='/'
                color='primary'
                variant='light'
                size='lg'
            >
                Volver al inicio
            </Button>
        </main>
    );
}

export default ErrorPage;
