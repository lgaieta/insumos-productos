'use server';

import Material from '@common/entities/Material';
import { accumulateFormErrors } from '@common/utils/accumulateFormErrors';
import { MaterialValidationSchema } from '@crear-insumo/schemas/MaterialValidationSchema';
import { updateMaterialAdapter } from '@insumo-detalles/adapter/updateMaterialAdapter';
import { MaterialDetailsFormErrors } from '@insumo-detalles/components/MaterialDetails';
import { updateMaterialFromDatabase } from '@insumo-detalles/services/updateMaterialFromDatabase';
import { getEditedMaterialFromFormData } from '@insumo-detalles/utils/getEditedMaterialFromFormData';
import { revalidatePath } from 'next/cache';

export async function editMaterialServerAction(
    materialId: Material['id'],
    _: { errors: MaterialDetailsFormErrors },
    formData: FormData,
) {
    'use server';
    try {
        const editedMaterial = getEditedMaterialFromFormData(formData);
        const parsedResult = MaterialValidationSchema.safeParse(editedMaterial);

        if (parsedResult.success === false) {
            return accumulateFormErrors(parsedResult);
        }

        await updateMaterialFromDatabase(
            await updateMaterialAdapter({ ...parsedResult.data, id: materialId }),
        );

        revalidatePath(`/insumo/${materialId}`);

        console.log('Updated material with id ' + materialId + ' successfully');

        return { errors: {} };
    } catch (e) {
        return {
            errors: {
                server: 'Ha ocurrido un error al editar los datos, por favor inténtelo nuevamente.',
            },
        };
    }
}