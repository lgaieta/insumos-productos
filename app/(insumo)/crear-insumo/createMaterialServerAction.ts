'use server';

import { MaterialValidationSchema } from '@/(insumo)/crear-insumo/MaterialValidationSchema';
import { getPool } from '@/services/getPool';
import { saveMaterialInDatabase } from '@/(insumo)/crear-insumo/saveMaterialInDatabase';
import { SERVER_ERROR_STRING } from './useCreateMaterial';

export const createMaterialServerAction = async (formData: FormData) => {
    try {
        const name = formData.get('name') as string;
        const file = formData.get('image') as File;
        const price = parseFloat(formData.get('price') as string);
        const link = (formData.get('link') as string) || null;

        const parsedResult = MaterialValidationSchema.safeParse({
            name,
            image: file.size === 0 ? null : file,
            price,
            link,
        });

        if (parsedResult.success === false) {
            return JSON.stringify(parsedResult);
        }

        const pool = getPool();

        await saveMaterialInDatabase(pool, { image: null, ...parsedResult.data });

        console.log(`Saved material with name ${name} and price ${price} successfully`);

        return JSON.stringify(parsedResult);
    } catch (e) {
        return SERVER_ERROR_STRING;
    }
};
