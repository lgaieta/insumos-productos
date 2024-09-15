'use server';

import Ingredient from '@common/entities/Ingredient';
import type IngredientRepository from '@common/entities/IngredientRepository';
import Product from '@common/entities/Product';
import type ProductRepository from '@common/entities/ProductRepository';
import MySQLIngredientRepository from '@productos/(lib)/services/MySQLIngredientRepository';
import MySQLProductRepository from '@productos/(lib)/services/MySQLProductRepository';
import { IngredientAmountSchema } from '@productos/(lib)/services/schemas/IngredientValidationSchema';
import UpdateIngredientAmount from '@productos/(lib)/usecases/UpdateIngredientAmount';
import { revalidatePath } from 'next/cache';

type Params = {
    newAmount: Ingredient['amount'];
    ingredientId: Ingredient['id'];
    productId: Product['id'];
};

export async function editIngredientAmountServerAction(params: Params) {
    const { newAmount, ingredientId, productId } = params;

    const validatedAmount = IngredientAmountSchema.safeParse(newAmount);

    if (validatedAmount.success === false) {
        return { error: 'true' };
    }

    const ingredientRepository: IngredientRepository = new MySQLIngredientRepository();
    const productRepository: ProductRepository = new MySQLProductRepository();

    try {
        const { success } = await UpdateIngredientAmount.execute({
            newAmount: validatedAmount.data,
            ingredientId,
            ingredientRepository,
            productRepository,
            productId,
        });

        if (!success) {
            return { error: 'true' };
        }

        console.log(`Updated ingredient ${ingredientId} successfully`);
    } catch (e) {
        return { error: 'true' };
    }

    revalidatePath(`/productos/detalles/${productId}`);
}
