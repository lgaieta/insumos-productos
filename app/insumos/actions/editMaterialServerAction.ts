'use server';

import Material from '@common/entities/Material';
import { accumulateFormErrors } from '@common/utils/accumulateFormErrors';
import { MaterialValidationSchema } from '@insumos/schemas/MaterialValidationSchema';
import { updateMaterialAdapter } from '@insumos/adapters/updateMaterialAdapter';
import { MaterialDetailsFormErrors } from '@insumos-detalles/components/MaterialDetails';
import { updateMaterialFromDatabase } from '@insumos/services/updateMaterialFromDatabase';
import { getEditedMaterialFromFormData } from '@insumos/utils/getEditedMaterialFromFormData';
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

        revalidatePath(`/insumo/detalles/${materialId}`);

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
