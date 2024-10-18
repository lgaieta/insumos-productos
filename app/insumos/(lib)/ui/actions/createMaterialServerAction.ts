'use server';

import { redirect } from 'next/navigation';
import { MaterialValidationSchema } from '@insumos/(lib)/schemas/MaterialValidationSchema';
import { CreateMaterialFormErrors } from '@insumos/(lib)/ui/components/create-material-form/CreateMaterialForm';
import MySQLMaterialRepository from '@insumos/(lib)/services/MySQLMaterialRepository';
import { blobToBase64 } from '@common/utils/blobToBase64';

export const createMaterialServerAction = async (_: any, formData: FormData) => {
    try {
        const name = formData.get('name') as string;
        const file = formData.get('image') as Blob;
        const price = parseFloat(formData.get('price') as string);
        const link = (formData.get('link') as string) || null;

        const parsedResult = MaterialValidationSchema.safeParse({
            name,
            image: file.size === 0 ? null : blobToBase64(file),
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

        const materialRepository = new MySQLMaterialRepository();
        await materialRepository.create({
            ...parsedResult.data,
            id: 1,
            image: parsedResult.data.image || null,
        });

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
