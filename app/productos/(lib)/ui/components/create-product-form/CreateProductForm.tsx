'use client';

import { Input } from '@nextui-org/input';
import ImageUploader from '@productos/(lib)/ui/components/image-uploader/ImageUploader';
import SubmitButton from '@productos/(lib)/ui/components/submit-button/SubmitButton';
import { useFormState } from 'react-dom';
import { createProductServerAction } from '@productos/(lib)/ui/actions/createProductServerAction';
import PriceTypeSelector from '@productos/(lib)/ui/components/price-type-selector/PriceTypeSelector';
import { useState } from 'react';
import type Ingredient from '@common/entities/Ingredient';
import DynamicPriceField from '@productos/(lib)/ui/components/dynamic-price-field/DynamicPriceField';
import IngredientType from '@common/entities/IngredientType';

export type CreateProductFormErrors = {
    name: string;
    price: string;
    image: string;
    link: string;
    server: string;
};

type FormState = { errors: Partial<CreateProductFormErrors> };

const defaultIngredients: Ingredient[] = [
    {
        id: 1,
        productId: 1,
        componentId: 1,
        componentName: 'Tomate',
        type: IngredientType.Material,
        unitPrice: 10,
        amount: 2,
    },
    {
        id: 2,
        productId: 1,
        componentId: 2,
        componentName: 'Lechuga',
        type: IngredientType.Material,
        unitPrice: 5,
        amount: 1,
    },
    {
        id: 3,
        productId: 1,
        componentId: 3,
        componentName: 'Pan',
        type: IngredientType.Product,
        unitPrice: 20,
        amount: 1,
    },
];

function CreateProductForm() {
    const [isDynamicPrice, setIsDynamicPrice] = useState(false);
    const [selectedIngredients, setSelectedIngredients] =
        useState<Ingredient[]>(defaultIngredients);

    const bindedAction = async (prevState: FormState, formData: FormData) => {
        return await createProductServerAction(
            prevState,
            formData,
            isDynamicPrice ? selectedIngredients : undefined,
        );
    };

    const [{ errors }, formAction] = useFormState<FormState, FormData>(bindedAction, {
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
                <FixedPriceField
                    isInvalid={!!errors?.price}
                    errorMessage={errors?.price || null}
                />
            )}
            {isDynamicPrice && (
                <DynamicPriceField
                    selectedIngredients={selectedIngredients}
                    onSelectedIngredientsChange={ingredients => setSelectedIngredients(ingredients)}
                />
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

function FixedPriceField(props: { isInvalid: boolean; errorMessage: string | null }) {
    return (
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
            isInvalid={props.isInvalid}
            errorMessage={props.errorMessage || null}
        />
    );
}

export default CreateProductForm;
