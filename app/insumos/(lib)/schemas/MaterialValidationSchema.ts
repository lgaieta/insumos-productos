import { object, string, number, instanceof as zodInstanceof } from 'zod';

export const MaterialValidationSchema = object({
    name: string({
        required_error: 'El nombre es requerido',
        invalid_type_error: 'El nombre no es válido',
    })
        .trim()
        .min(1, { message: 'El nombre es requerido' })
        .max(45, { message: 'El nombre puede tener solo hasta 45 caracteres' }),

    image: string().nullable(),

    price: number({
        required_error: 'El precio es requerido',
        invalid_type_error: 'El precio no es válido',
    }).nonnegative({ message: 'El precio no puede ser un número negativo' }),

    link: string().url({ message: 'El link no es válido' }).nullable(),
});
