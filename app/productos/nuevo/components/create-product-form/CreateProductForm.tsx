'use client';

import { Input } from '@nextui-org/input';
import ImageUploader from '@productos-nuevo/components/image-uploader/ImageUploader';
import SubmitButton from '@productos-nuevo/components/submit-button/SubmitButton';
import { useFormState } from 'react-dom';
import { createProductServerAction } from '@productos/(lib)/ui/actions/createProductServerAction';
import PriceTypeSelector from '@productos/nuevo/components/price-type-selector/PriceTypeSelector';
import { useState } from 'react';

export type CreateProductFormErrors = {
    name: string;
    price: string;
    image: string;
    link: string;
    server: string;
};

type FormState = { errors: Partial<CreateProductFormErrors> };

function CreateProductForm() {
    const [isDynamicPrice, setIsDynamicPrice] = useState(false);

    const [{ errors }, formAction] = useFormState<FormState, FormData>(createProductServerAction, {
        errors: {},
    });

    return (
        <form
            className='flex flex-col gap-6 w-full max-w-[500px]'
            action={formAction}
        >
            <NameField
                isInvalid={!!errors?.name}
                errorMessage={errors?.name || null}
            />
            <ImageUploader
                isError={errors?.image !== undefined}
                errorMessage={errors?.image || null}
            />
            <PriceTypeSelector
                isDynamic={isDynamicPrice}
                onToggle={setIsDynamicPrice}
            />
            {!isDynamicPrice && (
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
                    isInvalid={!!errors?.price}
                    errorMessage={errors?.price || null}
                />
            )}
            {isDynamicPrice && (
                <>
                    <Input
                        type='number'
                        label='Ganancia'
                        name='profit'
                        variant='bordered'
                        placeholder='Ingrese la ganancia del producto'
                        labelPlacement='outside'
                        endContent={
                            <div className='pointer-events-none flex items-center'>
                                <span className='text-foreground-400 text-base'>%</span>
                            </div>
                        }
                        classNames={{ label: 'font-bold' }}
                        size='lg'
                        isInvalid={!!errors?.price}
                        errorMessage={errors?.price || null}
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
                        isInvalid={!!errors?.price}
                        errorMessage={errors?.price || null}
                    />
                </>
            )}
            <LinkField
                isInvalid={!!errors?.link}
                errorMessage={errors?.link || null}
            />
            <SubmitButton />
            {errors?.server && <p className='text-danger text-center text-sm'>{errors?.server}</p>}
        </form>
    );
}

function NameField(props: { isInvalid: boolean; errorMessage: string | null }) {
    return (
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
            isInvalid={props.isInvalid}
            errorMessage={props.errorMessage || null}
            autoFocus
        />
    );
}

function LinkField(props: { isInvalid: boolean; errorMessage: string | null }) {
    return (
        <Input
            type='text'
            label='Link'
            name='link'
            variant='bordered'
            placeholder='Copie el link del producto y péguelo aquí'
            labelPlacement='outside'
            classNames={{ label: 'font-bold' }}
            size='lg'
            isInvalid={props.isInvalid}
            errorMessage={props.errorMessage || null}
        />
    );
}

export default CreateProductForm;
