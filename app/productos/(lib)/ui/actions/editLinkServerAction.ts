'use server';

import Product from '@common/entities/Product';
import MySQLProductRepository from '@productos/(lib)/services/MySQLProductRepository';
import UpdateProductLink from '@productos/(lib)/usecases/UpdateProductLink';
import { revalidatePath } from 'next/cache';
import { ZodError, z } from 'zod';

const linkValidator = z
    .string({
        required_error: 'El link es requerido',
        invalid_type_error: 'El link no es válido',
    })
    .url('El link no es válido');

export const editLinkServerAction = async (productId: Product['id'], formData: FormData) => {
    try {
        const link = formData.get('link') as string;

        const validLink = linkValidator.parse(link);

        await new UpdateProductLink().execute({
            data: { id: productId, link: validLink },
            productRepository: new MySQLProductRepository(),
        });

        revalidatePath('/productos');

        console.log(`Edited product with id ${productId} successfully`);
        return null;
    } catch (e) {
        console.error(e);

        if (e instanceof ZodError) return e.issues[0].message;
        else if (e instanceof Error) return e.message;
        else return null;
    }
};
