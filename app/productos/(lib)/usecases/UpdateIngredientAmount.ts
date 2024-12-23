import type { IngredientId } from '@common/entities/Ingredient';
import type IngredientRepository from '@common/entities/IngredientRepository';
import type { ProductId } from '@common/entities/Product';
import type ProductRepository from '@common/entities/ProductRepository';
import UpdateSuperProductsPrice from '@productos/(lib)/usecases/UpdateSuperProductsPrice';

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
            const product = await productRepository.getById(productId);
            await new UpdateSuperProductsPrice().execute({
                product: product!,
                productRepository,
                ingredientRepository,
            });

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
