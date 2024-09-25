import type IngredientRepository from '@common/entities/IngredientRepository';
import IngredientType from '@common/entities/IngredientType';
import type Product from '@common/entities/Product';
import ProductPriceType from '@common/entities/ProductPriceType';
import type ProductRepository from '@common/entities/ProductRepository';

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
        if (product.price_type === ProductPriceType.Fixed) return;

        const ingredients = (await ingredientRepository.getByComponentId(product.id)).filter(
            ingredient => ingredient.type === IngredientType.Product,
        );

        for (const ingredient of ingredients) {
            const superProduct = await productRepository.getById(ingredient.componentId);

            if (!superProduct) continue;

            const newPrice = await this.calculateProductPrice({
                product: superProduct,
                ingredientRepository,
            });

            await productRepository.update(product);

            console.log(product.id);

            await this.recalculate({
                product: { ...superProduct, price: newPrice },
                ingredientRepository,
                productRepository,
            });
        }
    }

    private async calculateProductPrice({
        product,
        ingredientRepository,
    }: {
        product: Product;
        ingredientRepository: IngredientRepository;
    }) {
        const ingredients = await ingredientRepository.getByProductId(product.id);

        const ingredientsSum = ingredients.reduce(
            (total, ingredient) => total + ingredient.unitPrice * ingredient.amount,
            0,
        );

        return ingredientsSum * (1 + product.profit / 100);
    }
}

export default UpdateSuperProductsPrice;
