import { useState } from 'react';
import { SafeParseReturnType } from 'zod';
import { createMaterialServerAction } from '@/(insumo)/crear-insumo/createMaterialServerAction';
import Material from '@/entities/Material';
import { useRouter } from 'next/navigation';

type InputFields = Omit<Material, 'id'>;

const emptyErrors = {
    name: '',
    price: '',
    image: '',
    link: '',
};

export const useCreateMaterial = () => {
    const [fieldsErrors, setFieldsErrors] = useState(emptyErrors);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const createMaterial = async (formData: FormData) => {
        setIsLoading(true);

        const stringResult = await createMaterialServerAction(formData);

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
        }

        setIsLoading(false);
        router.push('/insumos');
    };

    return { fieldsErrors, createMaterial, isLoading };
};
