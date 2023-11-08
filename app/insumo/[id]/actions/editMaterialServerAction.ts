import Material from '@common/entities/Material';
import { MaterialValidationSchema } from '@crear-insumo/schemas/MaterialValidationSchema';
import { MaterialDetailsFormErrors } from '@insumo/components/MaterialDetails';
import { getEditedMaterialFromFormData } from '@insumo/utils/getEditedMaterialFromFormData';

export async function editMaterialServerAction(
    _: MaterialDetailsFormErrors,
    formData: FormData,
    materialId: Material['id'],
) {
    'use server';

    const editedMaterial = getEditedMaterialFromFormData(formData);

    const parsedResult = MaterialValidationSchema.safeParse(editedMaterial);

    if (parsedResult.success === false) {
        const errors: Partial<MaterialDetailsFormErrors> = parsedResult.error.issues.reduce(
            (errorsAccumulator, issue) => ({
                ...errorsAccumulator,
                [issue.path[0]]: issue.message,
            }),
            {},
        );

        return { errors };
    }
}
