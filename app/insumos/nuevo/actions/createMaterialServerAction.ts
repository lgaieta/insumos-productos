'use server';

import { redirect } from 'next/navigation';
import { MaterialValidationSchema } from '@insumos-nuevo/schemas/MaterialValidationSchema';
import { pool } from '@common/services/pool';
import { saveMaterialInDatabase } from '@insumos-nuevo/services/saveMaterialInDatabase';
import { CreateMaterialFormErrors } from '../components/create-material-form/CreateMaterialForm';

export const createMaterialServerAction = async (_: any, formData: FormData) => {
    try {
        const name = formData.get('name') as string;
        const file = formData.get('image') as Blob;
        const price = parseFloat(formData.get('price') as string);
        const link = (formData.get('link') as string) || null;

        const parsedResult = MaterialValidationSchema.safeParse({
            name,
            image: file.size === 0 ? null : file,
            price,
            link,
        });

        if (parsedResult.success === false) {
            const errors: Partial<CreateMaterialFormErrors> = parsedResult.error.issues.reduce(
                (errorsAccumulator, issue) => ({
                    ...errorsAccumulator,
                    [issue.path[0]]: issue.message,
                }),
                {},
            );

            return { errors };
        }

        await saveMaterialInDatabase(pool, parsedResult.data);

        console.log(`Saved material with name ${name} and price ${price} successfully`);
    } catch (e) {
        console.log(e);

        return {
            errors: {
                server: 'Ha ocurrido un error al guardar los datos, por favor inténtelo nuevamente.',
            },
        };
    }

    redirect('/insumos');
};
