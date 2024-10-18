import CreateProductForm from '@productos/(lib)/ui/components/create-product-form/CreateProductForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Crear producto - Insumos y Productos',
};

function CreateProductPage() {
    return (
        <main className='flex flex-col items-center px-8 py-12 w-full text-foreground-900 bg-background'>
            <h1 className='text-4xl font-bold mb-12 text-center'>Crear producto</h1>
            <CreateProductForm />
        </main>
    );
}

export default CreateProductPage;
