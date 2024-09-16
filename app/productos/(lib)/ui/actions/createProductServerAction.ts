'use server';

import { redirect } from 'next/navigation';
import { ProductValidationSchema } from '@productos/(lib)/services/schemas/ProductValidationSchema';
import { accumulateFormErrors } from '@common/utils/accumulateFormErrors';
import CreateProduct from '@productos/(lib)/usecases/CreateProduct';
import MySQLProductRepository from '@productos/(lib)/services/MySQLProductRepository';

export const createProductServerAction = async (_: any, formData: FormData) => {
    try {
        const name = formData.get('name') as string;
        const file = formData.get('image') as Blob;
        const price = parseFloat(formData.get('price') as string);
        const profit = parseFloat(formData.get('profit') as string);
        const link = (formData.get('link') as string) || null;

        const parsedResult = ProductValidationSchema.safeParse({
            name,
            image: file.size === 0 ? null : file,
            price,
            link,
            profit,
        });

        if (parsedResult.success === false) {
            return accumulateFormErrors(parsedResult);
        }

        await CreateProduct.execute({
            newProduct: { id: 1, ...parsedResult.data },
            productRepository: new MySQLProductRepository(),
        });

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