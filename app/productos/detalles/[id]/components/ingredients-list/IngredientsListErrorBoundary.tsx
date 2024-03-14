'use client';

import ErrorBoundary from '@common/components/ErrorBoundary';
import { ReactNode } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { MdError } from 'react-icons/md';

function IngredientsListErrorBoundary({ children }: { children: ReactNode }) {
    return (
        <ErrorBoundary
            fallback={
                <Card classNames={{ header: 'justify-between p-5', body: 'p-5' }}>
                    <CardHeader>
                        <h2 className='text-xl font-bold'>Ingredientes</h2>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className='text-center flex flex-col items-center pt-4 gap-6'>
                            <MdError
                                color='#f31260'
                                size={64}
                            />
                            <p>
                                Ocurrió un error al cargar los productos, intente recargando la
                                página.
                            </p>
                        </div>
                    </CardBody>
                </Card>
            }
        >
            {children}
        </ErrorBoundary>
    );
}

export default IngredientsListErrorBoundary;
