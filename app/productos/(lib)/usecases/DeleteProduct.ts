import type IngredientRepository from '@common/entities/IngredientRepository';
import IngredientType from '@common/entities/IngredientType';
import type { ProductId } from '@common/entities/Product';
import type ProductRepository from '@common/entities/ProductRepository';

class DeleteProduct {
    static async execute({
        productId,
        productRepository,
        ingredientRepository,
    }: {
        productId: ProductId;
        productRepository: ProductRepository;
        ingredientRepository: IngredientRepository;
    }) {
        try {
            await ingredientRepository.deleteByComponentId(productId, IngredientType.Product);
            await productRepository.deleteById(productId);
            return { success: true };
        } catch (e) {
            console.error(e);
            return { success: false };
        }
    }
}

export default DeleteProduct;
