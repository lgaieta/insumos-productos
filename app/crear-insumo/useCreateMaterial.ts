import { useState } from 'react';
import { SafeParseReturnType } from 'zod';
import { createMaterialServerAction } from './createMaterialServerAction';
import Material from './Material';

type InputFields = Omit<Material, 'id'>;

const emptyErrors = {
    name: '',
    price: '',
    image: '',
};

export const useCreateMaterial = () => {
    const [fieldsErrors, setFieldsErrors] = useState(emptyErrors);

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

            setFieldsErrors({ ...emptyErrors, ...errors });
        } else {
            setFieldsErrors(emptyErrors);
        }

        setIsLoading(false);
    };

    return { fieldsErrors, createMaterial, isLoading };
};
