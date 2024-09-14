'use server';

import Product from '@common/entities/Product';
import { updateProductFromDatabase } from '@productos/(lib)/services/updateProductFromDatabase';
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

        await updateProductFromDatabase({ PRODUCTO_ID: productId, LINK: validLink });

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
