'use client';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Metadata } from 'next';
import { useState } from 'react';
import { createMaterialServerAction } from './createMaterialServerAction';
import { SafeParseReturnType } from 'zod';
import Material from './Material';

export const metadata: Metadata = {
    title: 'Crear insumo - Insumos y Productos',
};

type InputFields = Omit<Material, 'id'>;

function CreateMaterialPage() {
    const [fieldsState, setFieldsState] = useState({
        name: '',
        price: '',
    });

    const create = async (formData: FormData) => {
        const result = JSON.parse(
            await createMaterialServerAction(formData),
        ) as SafeParseReturnType<InputFields, InputFields>;

        if (result.success === false) {
            const errors = result.error.issues.reduce(
                (errorsAccumulator, issue) => ({
                    ...errorsAccumulator,
                    [issue.path[0]]: issue.message,
                }),
                {},
            );
            setFieldsState({
                ...fieldsState,
                ...errors,
            });
        } else {
            setFieldsState({
                name: '',
                price: '',
            });
            console.log('happy path');
        }
    };

    return (
        <main className='flex flex-col items-center px-8 py-12 w-full text-foreground-900 bg-background'>
            <h1 className='text-4xl font-bold mb-12 text-center'>
                Crear insumo
            </h1>
            <form
                className='flex flex-col gap-6 w-full max-w-[500px]'
                action={create}
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
                    Continuar
                </Button>
                <p className='text-sm text-foreground-400 text-center'>
                    Los links se agregan luego de completar este formulario
                </p>
            </form>
        </main>
    );
}

export default CreateMaterialPage;
