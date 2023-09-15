'use server';

import { MaterialValidationSchema } from './MaterialValidationSchema';
import { getPool } from './getPool';
import { saveMaterialInDatabase } from './saveMaterialInDatabase';

export const createMaterialServerAction = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const file = formData.get('image') as File;
    const price = parseFloat(formData.get('price') as string);

    console.log(file);
    console.log('---------------------------------------------------------');

    const parsedResult = MaterialValidationSchema.safeParse({
        name,
        image: file,
        price,
    });

    if (parsedResult.success === false) {
        console.log(parsedResult.error.issues);
        return JSON.stringify(parsedResult);
    }

    const pool = getPool();

    await saveMaterialInDatabase(pool, parsedResult.data);

    console.log(
        `Saved material with name ${name} and price ${price} successfully`,
    );

    return JSON.stringify(parsedResult);
};
