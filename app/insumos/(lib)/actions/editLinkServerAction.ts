'use server';

import Material from '@common/entities/Material';
import { updateMaterialFromDatabase } from '@insumos/(lib)/services/updateMaterialFromDatabase';
import { revalidatePath } from 'next/cache';
import { ZodError, z } from 'zod';

const linkValidator = z
    .string({
        required_error: 'El link es requerido',
        invalid_type_error: 'El link no es válido',
    })
    .url('El link no es válido');

export const editLinkServerAction = async (materialId: Material['id'], formData: FormData) => {
    try {
        const link = formData.get('link') as string;

        const validLink = linkValidator.parse(link);

        await updateMaterialFromDatabase({ INSUMO_ID: materialId, LINK: validLink });

        revalidatePath('/insumos');

        console.log(`Edited material with id ${materialId} successfully`);
        return null;
    } catch (e) {
        console.error(e);

        if (e instanceof ZodError) return e.issues[0].message;
        else if (e instanceof Error) return e.message;
        else return null;
    }
};
