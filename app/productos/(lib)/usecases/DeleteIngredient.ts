import type { IngredientId } from '@common/entities/Ingredient';
import type IngredientRepository from '@common/entities/IngredientRepository';
import type { ProductId } from '@common/entities/Product';
import type ProductRepository from '@common/entities/ProductRepository';
import UpdateSuperProductsPrice from '@productos/(lib)/usecases/UpdateSuperProductsPrice';

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
