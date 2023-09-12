import { useState } from 'react';
import { SafeParseReturnType } from 'zod';
import { createMaterialServerAction } from './createMaterialServerAction';
import Material from './Material';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

type InputFields = Omit<Material, 'id'>;

export const useCreateMaterial = () => {
    const [fieldsState, setFieldsState] = useState({
        name: '',
        price: '',
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const createMaterial = async (formData: FormData) => {
        setIsLoading(true);

        const stringResult = await createMaterialServerAction(formData);

        const result = JSON.parse(stringResult) as SafeParseReturnType<
            InputFields,
            InputFields
        >;

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
        }

        setIsLoading(false);
    };

    return { fieldsState, createMaterial, isLoading };
};
