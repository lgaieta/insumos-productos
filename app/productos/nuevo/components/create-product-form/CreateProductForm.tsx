'use client';

import { Input } from '@nextui-org/input';
import ImageUploader from '@productos-nuevo/components/image-uploader/ImageUploader';
import SubmitButton from '@productos-nuevo/components/submit-button/SubmitButton';
import { useFormState } from 'react-dom';
import { createProductServerAction } from '@productos-nuevo/actions/createProductServerAction';

export type CreateProductFormErrors = {
    name: string;
    price: string;
    image: string;
    link: string;
    /** Used for errors caught by catch statement */
    server: string;
};

type FormState = { errors: Partial<CreateProductFormErrors> };

function CreateProductForm() {
    const [{ errors }, formAction] = useFormState<FormState, FormData>(createProductServerAction, {
        errors: {},
    });

    return (
        <form
            className='flex flex-col gap-6 w-full max-w-[500px]'
            action={formAction}
        >
            <Input
                type='text'
                label='Nombre'
                name='name'
                variant='bordered'
                placeholder='Ingrese el nombre del producto'
                labelPlacement='outside'
                classNames={{ label: 'font-bold' }}
                size='lg'
                isClearable
                validationState={errors?.name ? 'invalid' : 'valid'}
                errorMessage={errors?.name || null}
                autoFocus
            />
            <ImageUploader
                isError={errors?.image !== undefined}
                errorMessage={errors?.image || null}
            />
            <Input
                type='number'
                label='Costo'
                name='price'
                variant='bordered'
                placeholder='Ingrese el costo del producto'
                labelPlacement='outside'
                endContent={
                    <div className='pointer-events-none flex items-center'>
                        <span className='text-foreground-400 text-base'>$</span>
                    </div>
                }
                classNames={{ label: 'font-bold' }}
                size='lg'
                validationState={errors?.price ? 'invalid' : 'valid'}
                errorMessage={errors?.price || null}
            />
            <Input
                type='text'
                label='Link'
                name='link'
                variant='bordered'
                placeholder='Copie el link del producto y péguelo aquí'
                labelPlacement='outside'
                classNames={{ label: 'font-bold' }}
                size='lg'
                validationState={errors?.link ? 'invalid' : 'valid'}
                errorMessage={errors?.link || null}
            />
            <SubmitButton />
            {errors?.server && <p className='text-danger text-center text-sm'>{errors?.server}</p>}
        </form>
    );
}

export default CreateProductForm;
