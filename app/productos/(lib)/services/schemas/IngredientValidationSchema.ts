import type Ingredient from '@common/entities/Ingredient';
import IngredientType from '@common/entities/IngredientType';
import z from 'zod';

export const IngredientIdSchema = z
    .number({ invalid_type_error: 'El id debe ser un número entero' })
    .int({ message: 'El id debe ser un número entero' })
    .positive({ message: 'El id no puede ser un número negativo' });

export const IngredientProductIdSchema = z
    .number({ invalid_type_error: 'El id del producto debe ser un número entero' })
    .int({ message: 'El id del producto debe ser un número entero' })
    .positive({ message: 'El id del producto no puede ser un número negativo' });

export const IngredientComponentIdSchema = z
    .number({ invalid_type_error: 'El id del material debe ser un número entero' })
    .int({ message: 'El id del material debe ser un número entero' })
    .positive({ message: 'El id del material no puede ser un número negativo' });

export const IngredientComponentNameSchema = z
    .string({ required_error: 'El nombre del material es requerido' })
    .min(1, {
        message: 'El nombre del material debe tener al menos 1 carácter',
    });

export const IngredientTypeSchema = z.nativeEnum(IngredientType);

export const IngredientUnitPriceSchema = z
    .number({ invalid_type_error: 'El precio debe ser un número' })
    .nonnegative({ message: 'El precio no puede ser un número negativo' });

export const IngredientAmountSchema = z
    .number({ invalid_type_error: 'La cantidad debe ser un número' })
    .nonnegative({ message: 'La cantidad no puede ser un número negativo' });

export const IngredientValidationSchema = (
    type: IngredientType,
): z.ZodSchema<Ingredient<IngredientType>> => {
    return z.object({
        id: IngredientIdSchema,
        productId: IngredientProductIdSchema,
        componentId:
            type === IngredientType.Material
                ? IngredientComponentIdSchema
                : IngredientComponentIdSchema,
        componentName:
            type === IngredientType.Material
                ? IngredientComponentNameSchema
                : IngredientComponentNameSchema,
        type: IngredientTypeSchema,
        unitPrice: IngredientUnitPriceSchema,
        amount: IngredientAmountSchema,
    });
};
