'use server';

import Material from '@common/entities/Material';
import { accumulateFormErrors } from '@common/utils/accumulateFormErrors';
import { MaterialValidationSchema } from '@insumos/(lib)/schemas/MaterialValidationSchema';
import { updateMaterialAdapter } from '@insumos/(lib)/adapters/updateMaterialAdapter';
import { MaterialDetailsFormErrors } from '@insumos-detalles/components/MaterialDetails';
import { getEditedMaterialFromFormData } from '@insumos/(lib)/utils/getEditedMaterialFromFormData';
import { revalidatePath } from 'next/cache';
import MySQLMaterialRepository from '@insumos/(lib)/services/MySQLMaterialRepository';

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

        const materialRepository = new MySQLMaterialRepository();
        await materialRepository.update({ ...parsedResult.data, id: materialId });

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
