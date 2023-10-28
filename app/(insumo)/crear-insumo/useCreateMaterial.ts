import { useState } from 'react';
import { SafeParseReturnType } from 'zod';
import { createMaterialServerAction } from '@/(insumo)/crear-insumo/createMaterialServerAction';
import Material from '@/entities/Material';
import { useRouter } from 'next/navigation';

type InputFields = Omit<Material, 'id'>;

export const SERVER_ERROR_STRING = 'SERVER_ERROR';

const emptyErrors = {
    name: '',
    price: '',
    image: '',
    link: '',
};

export const useCreateMaterial = () => {
    const [fieldsErrors, setFieldsErrors] = useState(emptyErrors);
    const [requestError, setRequestError] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const createMaterial = async (formData: FormData) => {
        setIsLoading(true);

        const stringResult = await createMaterialServerAction(formData);

        if (stringResult === SERVER_ERROR_STRING) {
            setFieldsErrors(emptyErrors);
            setIsLoading(false);
            setRequestError(true);
            return;
        }

        const result = JSON.parse(stringResult) as SafeParseReturnType<InputFields, InputFields>;

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
            router.push('/insumos');
        }

        setIsLoading(false);
        setRequestError(false);
    };

    return { fieldsErrors, createMaterial, isLoading, requestError };
};
