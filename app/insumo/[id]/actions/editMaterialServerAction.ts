'use server';

import Material from '@common/entities/Material';
import { MaterialValidationSchema } from '@crear-insumo/schemas/MaterialValidationSchema';
import { updateMaterialAdapter } from '@insumo/adapter/updateMaterialAdapter';
import { MaterialDetailsFormErrors } from '@insumo/components/MaterialDetails';
import { updateMaterialFromDatabase } from '@insumo/services/updateMaterialFromDatabase';
import { getEditedMaterialFromFormData } from '@insumo/utils/getEditedMaterialFromFormData';
import { revalidatePath } from 'next/cache';

export async function editMaterialServerAction(
    materialId: Material['id'],
    _: { errors: MaterialDetailsFormErrors; isFinished: boolean },
    formData: FormData,
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

        console.log(errors);

        return { errors, isFinished: true };
    }

    await updateMaterialFromDatabase(
        await updateMaterialAdapter({ ...parsedResult.data, id: materialId }),
    );

    revalidatePath(`/insumo/${materialId}`);

    console.log('Updated material with id ' + materialId + ' successfully');

    return { errors: {}, isFinished: true };
}
