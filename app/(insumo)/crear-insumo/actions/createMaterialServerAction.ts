'use server';

import { redirect } from 'next/navigation';
import { MaterialValidationSchema } from '@/(insumo)/crear-insumo/schemas/MaterialValidationSchema';
import { getPool } from '@/services/getPool';
import { saveMaterialInDatabase } from '@/(insumo)/crear-insumo/services/saveMaterialInDatabase';
import { CreateMaterialFormErrors } from '../components/create-material-form/CreateMaterialForm';

export const createMaterialServerAction = async (_: any, formData: FormData) => {
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
            const errors: Partial<CreateMaterialFormErrors> = parsedResult.error.issues.reduce(
                (errorsAccumulator, issue) => ({
                    ...errorsAccumulator,
                    [issue.path[0]]: issue.message,
                }),
                {},
            );

            return { errors };
        }

        const pool = getPool();

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
