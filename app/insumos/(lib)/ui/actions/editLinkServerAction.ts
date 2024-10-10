'use server';

import Material from '@common/entities/Material';
import MySQLMaterialRepository from '@insumos/(lib)/services/MySQLMaterialRepository';
import { revalidatePath } from 'next/cache';
import { ZodError, z } from 'zod';

const linkValidator = z
    .string({
        required_error: 'El link es requerido',
        invalid_type_error: 'El link no es válido',
    })
    .url('El link no es válido');

export const editLinkServerAction = async (material: Material, formData: FormData) => {
    try {
        const link = formData.get('link') as string;

        const validLink = linkValidator.parse(link);

        const materialRepository = new MySQLMaterialRepository();
        await materialRepository.update({ ...material, link: validLink });

        revalidatePath('/insumos');

        console.log(`Edited material with id ${material.id} successfully`);
        return null;
    } catch (e) {
        console.error(e);

        if (e instanceof ZodError) return e.issues[0].message;
        else if (e instanceof Error) return e.message;
        else return null;
    }
};
