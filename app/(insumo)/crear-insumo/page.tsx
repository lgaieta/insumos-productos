'use client';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Metadata } from 'next';
import { useCreateMaterial } from '@/(insumo)/crear-insumo/useCreateMaterial';
import ImageUploader from '@/components/image-uploader/ImageUploader';

export const metadata: Metadata = {
    title: 'Crear insumo - Insumos y Productos',
};

function CreateMaterialPage() {
    const { fieldsErrors, createMaterial, isLoading } = useCreateMaterial();

    return (
        <main className='flex flex-col items-center px-8 py-12 w-full text-foreground-900 bg-background'>
            <h1 className='text-4xl font-bold mb-12 text-center'>
                Crear insumo
            </h1>
            <form
                className='flex flex-col gap-6 w-full max-w-[500px]'
                action={createMaterial}
            >
                <Input
                    type='text'
                    label='Nombre'
                    name='name'
                    variant='bordered'
                    placeholder='Ingrese el nombre del insumo'
                    labelPlacement='outside'
                    classNames={{ label: 'font-bold' }}
                    size='lg'
                    isClearable
                    validationState={
                        fieldsErrors.name.length > 0 ? 'invalid' : 'valid'
                    }
                    errorMessage={
                        fieldsErrors.name.length > 0 ? fieldsErrors.name : null
                    }
                />
                <ImageUploader
                    isError={fieldsErrors.image.length > 0}
                    errorMessage={
                        fieldsErrors.image.length > 0
                            ? fieldsErrors.image
                            : null
                    }
                />
                <Input
                    type='number'
                    label='Costo'
                    name='price'
                    variant='bordered'
                    placeholder='Ingrese el costo del insumo'
                    labelPlacement='outside'
                    endContent={
                        <div className='pointer-events-none flex items-center'>
                            <span className='text-foreground-400 text-base'>
                                $
                            </span>
                        </div>
                    }
                    classNames={{ label: 'font-bold' }}
                    size='lg'
                    validationState={
                        fieldsErrors.price.length > 0 ? 'invalid' : 'valid'
                    }
                    errorMessage={
                        fieldsErrors.price.length > 0
                            ? fieldsErrors.price
                            : null
                    }
                />
                <Input
                    type='text'
                    label='Link'
                    name='link'
                    variant='bordered'
                    placeholder='Copie el link del insumo y péguelo aquí'
                    labelPlacement='outside'
                    classNames={{ label: 'font-bold' }}
                    size='lg'
                    validationState={
                        fieldsErrors.link.length > 0 ? 'invalid' : 'valid'
                    }
                    errorMessage={
                        fieldsErrors.link.length > 0 ? fieldsErrors.link : null
                    }
                />
                <Button
                    color='primary'
                    size='lg'
                    type='submit'
                >
                    {isLoading ? 'Cargando...' : 'Continuar'}
                </Button>
            </form>
        </main>
    );
}

export default CreateMaterialPage;
