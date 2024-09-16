import type { IngredientId } from '@common/entities/Ingredient';
import type IngredientRepository from '@common/entities/IngredientRepository';
import type { ProductId } from '@common/entities/Product';
import type ProductRepository from '@common/entities/ProductRepository';

class UpdateIngredientAmount {
    static async execute({
        newAmount,
        ingredientId,
        productId,
        ingredientRepository,
        productRepository,
    }: {
        newAmount: number;
        ingredientId: IngredientId;
        productId: ProductId;
        ingredientRepository: IngredientRepository;
        productRepository: ProductRepository;
    }) {
        try {
            await ingredientRepository.updateAmount(ingredientId, newAmount);
            await productRepository.recalculatePriceRecursively(productId);
            return {
                success: true,
            };
        } catch (e) {
            console.error(e);
            return {
                success: false,
            };
        }
    }
}

export default UpdateIngredientAmount;
