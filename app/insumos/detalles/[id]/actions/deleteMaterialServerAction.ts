'use server';

import Material from '@common/entities/Material';
import { deleteMaterialAdapter } from '@insumos/detalles/[id]/adapters/deleteMaterialAdapter';
import { deleteMaterialFromDatabase } from '@insumos/detalles/[id]/services/deleteMaterialFromDatabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteMaterialServerAction(
    materialId: Material['id'],
    _: any,
    _formData: FormData,
) {
    'use server';
    try {
        await deleteMaterialFromDatabase(deleteMaterialAdapter(materialId));

        revalidatePath(`/insumos`);

        console.log('Deleted material with id ' + materialId + ' successfully');
    } catch (e) {
        return {
            errors: {
                server: 'Ha ocurrido un error al editar los datos, por favor inténtelo nuevamente.',
            },
        };
    }

    redirect('/insumos');
}
