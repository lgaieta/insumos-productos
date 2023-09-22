'use server';

import { MaterialValidationSchema } from '@/crear-insumo/MaterialValidationSchema';
import { getPool } from '@/crear-insumo/getPool';
import { saveMaterialInDatabase } from '@/crear-insumo/saveMaterialInDatabase';

export const createMaterialServerAction = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const file = formData.get('image') as File;
    const price = parseFloat(formData.get('price') as string);

    const parsedResult = MaterialValidationSchema.safeParse({
        name,
        image: file.size === 0 ? null : file,
        price,
    });

    if (parsedResult.success === false) {
        return JSON.stringify(parsedResult);
    }

    const pool = getPool();

    await saveMaterialInDatabase(pool, { image: null, ...parsedResult.data });

    console.log(
        `Saved material with name ${name} and price ${price} successfully`,
    );

    return JSON.stringify(parsedResult);
};
