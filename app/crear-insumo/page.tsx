'use client';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Metadata } from 'next';
import { useCreateMaterial } from './useCreateMaterial';

export const metadata: Metadata = {
    title: 'Crear insumo - Insumos y Productos',
};

function CreateMaterialPage() {
    const { fieldsState, createMaterial, isLoading } = useCreateMaterial();

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
                        fieldsState.name.length > 0 ? 'invalid' : 'valid'
                    }
                    errorMessage={
                        fieldsState.name.length > 0 ? fieldsState.name : null
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
                        fieldsState.price.length > 0 ? 'invalid' : 'valid'
                    }
                    errorMessage={
                        fieldsState.price.length > 0 ? fieldsState.price : null
                    }
                />
                <Button
                    color='primary'
                    size='lg'
                    type='submit'
                >
                    {isLoading ? 'Cargando...' : 'Continuar'}
                </Button>
                <p className='text-sm text-foreground-400 text-center'>
                    Los links se agregan luego de completar este formulario
                </p>
            </form>
        </main>
    );
}

export default CreateMaterialPage;
