import { Spinner } from '@nextui-org/spinner';
import ProductsTable from './components/products-table/ProductsTable';
import { Suspense } from 'react';
import ProductsTableErrorBoundary from './components/products-table/ProductsTableErrorBoundary';

export const dynamic = 'force-dynamic';

function ProductsPage() {
    return (
        <main className='flex flex-col items-center px-4 sm:px-8 py-12 w-full text-foreground-900 bg-background'>
            <h1 className='text-4xl font-bold mb-12 text-center'>Productos</h1>

            <ProductsTableErrorBoundary>
                <Suspense fallback={<Spinner label='Cargando productos' />}>
                    <ProductsTable />
                </Suspense>
            </ProductsTableErrorBoundary>
        </main>
    );
}

export default ProductsPage;
