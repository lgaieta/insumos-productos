import type { IngredientId } from '@common/entities/Ingredient';
import type IngredientRepository from '@common/entities/IngredientRepository';
import type NewIngredientsList from '@common/entities/NewIngredientsList';
import type { ProductId } from '@common/entities/Product';
import type ProductRepository from '@common/entities/ProductRepository';

class DeleteIngredient {
    static async execute({
        ingredientId,
        productId,
        ingredientRepository,
        productRepository,
    }: {
        ingredientId: IngredientId;
        productId: ProductId;
        ingredientRepository: IngredientRepository;
        productRepository: ProductRepository;
    }) {
        try {
            await ingredientRepository.deleteById(ingredientId);
            await productRepository.updatePriceRecursively(productId);

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

export default DeleteIngredient;
