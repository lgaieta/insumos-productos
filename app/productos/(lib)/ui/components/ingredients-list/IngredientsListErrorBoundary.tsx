'use client';

import ErrorBoundary from '@common/ui/components/ErrorBoundary';
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
                        <div className='flex items-center gap-2'>
                            <MdError
                                color='#f31260'
                                size={32}
                            />
                            <p>
                                Ocurrió un error al cargar los ingredientes, intente recargando la
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
