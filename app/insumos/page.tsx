import MaterialsTable from '@insumos/components/materials-table/MaterialsTable';
import MaterialsTableErrorBoundary from '@insumos/components/materials-table/MaterialsTableErrorBoundary';
import { Spinner } from '@nextui-org/spinner';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

function MaterialsPage() {
    return (
        <main className='flex flex-col items-center px-4 sm:px-8 py-12 w-full text-foreground-900 bg-background'>
            <h1 className='text-4xl font-bold mb-12 text-center'>Insumos</h1>

            <MaterialsTableErrorBoundary>
                <Suspense fallback={<Spinner label='Cargando insumos' />}>
                    <MaterialsTable />
                </Suspense>
            </MaterialsTableErrorBoundary>
        </main>
    );
}

export default MaterialsPage;
