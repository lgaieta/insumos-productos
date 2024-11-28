import type IngredientRepository from '@common/entities/IngredientRepository';
import IngredientType from '@common/entities/IngredientType';
import type Product from '@common/entities/Product';
import ProductPriceType from '@common/entities/ProductPriceType';
import type ProductRepository from '@common/entities/ProductRepository';
import RecalculateDynamicProductPrice from '@productos/(lib)/usecases/RecalculateDynamicProductPrice';

type UpdateSuperProductsPriceDependencies = {
    product: Product;
    productRepository: ProductRepository;
    ingredientRepository: IngredientRepository;
};

class UpdateSuperProductsPrice {
    async execute(dependencies: UpdateSuperProductsPriceDependencies) {
        try {
            const { ingredientRepository, product: newProduct, productRepository } = dependencies;

            await this.recalculate({
                product: newProduct,
                ingredientRepository,
                productRepository,
            });

            return { success: true };
        } catch (e) {
            return { success: false };
        }
    }

    private async recalculate({
        product,
        ingredientRepository,
        productRepository,
    }: {
        product: Product;
        ingredientRepository: IngredientRepository;
        productRepository: ProductRepository;
    }) {
        const ingredients = (await ingredientRepository.getByComponentId(product.id)).filter(
            ingredient => ingredient.type === IngredientType.Product,
        );

        if (ingredients.length === 0) return;

        for (const ingredient of ingredients) {
            const superProduct = await productRepository.getById(ingredient.productId);

            if (!superProduct) continue;

            await new RecalculateDynamicProductPrice().execute({
                product: superProduct,
                productRepository,
                ingredientRepository,
            });

            console.log(`Recalculated price for product ${superProduct.name} (${superProduct.id})`);

            await this.recalculate({
                product: superProduct,
                ingredientRepository,
                productRepository,
            });
        }
    }
}

export default UpdateSuperProductsPrice;
