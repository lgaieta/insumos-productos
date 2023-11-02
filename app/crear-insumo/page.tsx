import CreateMaterialForm from '@/crear-insumo/components/create-material-form/CreateMaterialForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Crear insumo - Insumos y Productos',
};

function CreateMaterialPage() {
    return (
        <main className='flex flex-col items-center px-8 py-12 w-full text-foreground-900 bg-background'>
            <h1 className='text-4xl font-bold mb-12 text-center'>Crear insumo</h1>
            <CreateMaterialForm />
        </main>
    );
}

export default CreateMaterialPage;
