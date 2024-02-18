import { Spinner } from '@nextui-org/spinner';
import MaterialsTable from './components/materials-table/MaterialsTable';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

function MaterialsPage() {
    return (
        <main className='flex flex-col items-center px-4 sm:px-8 py-12 w-full text-foreground-900 bg-background'>
            <h1 className='text-4xl font-bold mb-12 text-center'>Insumos</h1>
            <Suspense fallback={<Spinner label='Cargando insumos' />}>
                <MaterialsTable />
            </Suspense>
        </main>
    );
}

export default MaterialsPage;
