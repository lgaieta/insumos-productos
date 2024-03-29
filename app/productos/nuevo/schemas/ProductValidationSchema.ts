import { object, string, number, instanceof as zodInstanceof } from 'zod';

export const ProductValidationSchema = object({
    name: string({
        required_error: 'El nombre es requerido',
        invalid_type_error: 'El nombre no es válido',
    })
        .trim()
        .min(1, { message: 'El nombre es requerido' })
        .max(45, { message: 'El nombre puede tener solo hasta 45 caracteres' }),

    image: zodInstanceof(Blob)
        .refine(blob => blob.size / 1000 < 16000, {
            message: 'El archivo no puede ser más pesado que 16MB',
        })
        .refine(blob => blob.type === 'image/png' || blob.type === 'image/jpeg', {
            message: 'El archivo debe ser de tipo .png o .jpg',
        })
        .nullable(),

    price: number({
        required_error: 'El precio es requerido',
        invalid_type_error: 'El precio no es válido',
    }).nonnegative({ message: 'El precio no puede ser un número negativo' }),

    link: string().url({ message: 'El link no es válido' }).nullable(),
});
