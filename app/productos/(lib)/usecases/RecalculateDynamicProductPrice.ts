import type IngredientRepository from '@common/entities/IngredientRepository';
import type Product from '@common/entities/Product';
import ProductPriceType from '@common/entities/ProductPriceType';
import type ProductRepository from '@common/entities/ProductRepository';

type RecalculateProductPriceDependencies = {
    productRepository: ProductRepository;
    product: Product;
    ingredientRepository: IngredientRepository;
};

class RecalculateDynamicProductPrice {
    async execute(dependencies: RecalculateProductPriceDependencies) {
        try {
            const { product, productRepository, ingredientRepository } = dependencies;

            if (!product) return { success: false };

            if (product.priceType === ProductPriceType.Fixed) return { success: false };

            const ingredients = await ingredientRepository.getByProductId(product.id);

            const ingredientsSum = ingredients.reduce(
                (total, ingredient) => total + ingredient.unitPrice * ingredient.amount,
                0,
            );

            const newPrice = ingredientsSum * (1 + product.profit / 100);

            await productRepository.update({ ...product, price: newPrice });

            return { success: true };
        } catch (e) {
            console.error(e);
            return { success: false };
        }
    }
}

export default RecalculateDynamicProductPrice;
