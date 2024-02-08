import MaterialsTable from './components/materials-table/MaterialsTable';

function MaterialsPage() {
    return (
        <main className='flex flex-col items-center px-8 py-12 w-full text-foreground-900 bg-background'>
            <h1 className='text-4xl font-bold mb-12 text-center'>Insumos</h1>
            <MaterialsTable />
        </main>
    );
}

export default MaterialsPage;
