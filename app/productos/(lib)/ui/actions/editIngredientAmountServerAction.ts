'use server';

import type Ingredient from '@common/entities/Ingredient';
import type IngredientRepository from '@common/entities/IngredientRepository';
import type Product from '@common/entities/Product';
import type ProductRepository from '@common/entities/ProductRepository';
import MySQLIngredientRepository from '@productos/(lib)/services/MySQLIngredientRepository';
import MySQLProductRepository from '@productos/(lib)/services/MySQLProductRepository';
import { IngredientAmountSchema } from '@productos/(lib)/services/schemas/IngredientValidationSchema';
import RecalculateDynamicProductPrice from '@productos/(lib)/usecases/RecalculateDynamicProductPrice';
import UpdateIngredientAmount from '@productos/(lib)/usecases/UpdateIngredientAmount';
import UpdateSuperProductsPrice from '@productos/(lib)/usecases/UpdateSuperProductsPrice';
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
        return { error: 'Invalid ingredient amount' };
    }

    const ingredientRepository: IngredientRepository = new MySQLIngredientRepository();
    const productRepository: ProductRepository = new MySQLProductRepository();

    try {
        const { success: updateIngredientSuccess } = await UpdateIngredientAmount.execute({
            newAmount: validatedAmount.data,
            ingredientId,
            ingredientRepository,
            productRepository,
            productId,
        });

        if (!updateIngredientSuccess) {
            return { error: 'Failed to update ingredient amount' };
        }

        const product = await productRepository.getById(productId);

        if (!product) return { error: 'Product not found' };

        const { success: recalculateProductSuccess } =
            await new RecalculateDynamicProductPrice().execute({
                product,
                ingredientRepository,
                productRepository,
            });

        if (!recalculateProductSuccess) return { error: 'Failed to recalculate product price' };

        const { success: updateSuperProductsSuccess } =
            await new UpdateSuperProductsPrice().execute({
                product,
                productRepository,
                ingredientRepository,
            });

        if (!updateSuperProductsSuccess) return { error: 'Failed to update super products price' };

        console.log(`Updated ingredient ${ingredientId} successfully`);
    } catch (e) {
        return { error: 'true' };
    }

    revalidatePath(`/productos/detalles/${productId}`);
}
