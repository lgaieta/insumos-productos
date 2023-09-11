'use server';

import { MaterialValidationSchema } from './MaterialValidationSchema';
import { getPool } from './getPool';
import { saveMaterialInDatabase } from './saveMaterialInDatabase';

export async function createMaterialServerAction(formData: FormData) {
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);

    const parsedResult = MaterialValidationSchema.safeParse({
        name,
        price,
    });

    if (parsedResult.success === false) {
        console.log(parsedResult.error.issues);
        return JSON.stringify(parsedResult);
    }

    const pool = getPool();

    await saveMaterialInDatabase(pool, parsedResult.data);

    return JSON.stringify(parsedResult);
}
