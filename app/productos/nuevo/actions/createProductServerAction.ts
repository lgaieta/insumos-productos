'use server';

import { redirect } from 'next/navigation';
import { ProductValidationSchema } from '@productos-nuevo/schemas/ProductValidationSchema';
import { pool } from '@common/services/pool';
import { saveProductInDatabase } from '@productos-nuevo/services/saveProductInDatabase';
import { CreateProductFormErrors } from '../components/create-product-form/CreateProductForm';

export const createProductServerAction = async (_: any, formData: FormData) => {
    try {
        const name = formData.get('name') as string;
        const file = formData.get('image') as Blob;
        const price = parseFloat(formData.get('price') as string);
        const link = (formData.get('link') as string) || null;

        const parsedResult = ProductValidationSchema.safeParse({
            name,
            image: file.size === 0 ? null : file,
            price,
            link,
        });

        if (parsedResult.success === false) {
            const errors: Partial<CreateProductFormErrors> = parsedResult.error.issues.reduce(
                (errorsAccumulator, issue) => ({
                    ...errorsAccumulator,
                    [issue.path[0]]: issue.message,
                }),
                {},
            );

            return { errors };
        }

        await saveProductInDatabase(pool, parsedResult.data);

        console.log(`Saved product with name ${name} and price ${price} successfully`);
    } catch (e) {
        console.log(e);

        return {
            errors: {
                server: 'Ha ocurrido un error al guardar los datos, por favor inténtelo nuevamente.',
            },
        };
    }

    redirect('/productos');
};
