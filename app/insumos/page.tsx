import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import MaterialsTable from './components/materials-table/MaterialsTable';
import MaterialsTableSkeleton from './components/materials-table/MaterialsTableSkeleton';
import { Suspense } from 'react';

function MaterialsPage() {
    return (
        <main className='flex flex-col items-center px-8 py-12 w-full text-foreground-900 bg-background'>
            <h1 className='text-4xl font-bold mb-12 text-center'>Insumos</h1>
            <div className='flex flex-col-reverse gap-6 sm:flex-row items-center justify-between w-full'>
                <Input
                    size='sm'
                    radius='md'
                    type='text'
                    variant='bordered'
                    isClearable
                    label='Buscar'
                    classNames={{ base: 'w-full sm:w-auto sm:max-w-[300px]' }}
                />
                <Button
                    color='primary'
                    as={Link}
                    href='/insumos/nuevo'
                    className='w-full sm:w-fit'
                >
                    Nuevo Insumo
                </Button>
            </div>
            <Suspense fallback={<MaterialsTableSkeleton />}>
                <MaterialsTable />
            </Suspense>
        </main>
    );
}

export default MaterialsPage;
