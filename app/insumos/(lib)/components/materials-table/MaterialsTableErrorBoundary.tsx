'use client';

import ErrorBoundary from '@common/ui/components/ErrorBoundary';
import { ReactNode } from 'react';
import { MdError } from 'react-icons/md';

function MaterialsTableErrorBoundary({ children }: { children: ReactNode }) {
    return (
        <ErrorBoundary
            fallback={
                <div className='text-center flex flex-col items-center pt-4 gap-6'>
                    <MdError
                        color='#f31260'
                        size={64}
                    />
                    <p>Ocurrió un error al cargar los insumos, intente recargando la página.</p>
                </div>
            }
        >
            {children}
        </ErrorBoundary>
    );
}

export default MaterialsTableErrorBoundary;
