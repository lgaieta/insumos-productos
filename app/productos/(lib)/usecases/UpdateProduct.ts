import type IngredientRepository from '@common/entities/IngredientRepository';
import type Product from '@common/entities/Product';
import ProductPriceType from '@common/entities/ProductPriceType';
import type ProductRepository from '@common/entities/ProductRepository';
import UpdateSuperProductsPrice from '@productos/(lib)/usecases/UpdateSuperProductsPrice';

type UpdateProductDependencies = {
    newProduct: Product;
    productRepository: ProductRepository;
    ingredientRepository: IngredientRepository;
};

class UpdateProduct {
    async execute(dependencies: UpdateProductDependencies) {
        try {
            const { newProduct, productRepository, ingredientRepository } = dependencies;

            const newProductPrice =
                newProduct.price_type === ProductPriceType.Fixed
                    ? newProduct.price
                    : await this.calculateProductPrice({
                          product: newProduct,
                          ingredientRepository,
                      });

            await productRepository.update({ ...newProduct, price: newProductPrice });

            const { success } = await new UpdateSuperProductsPrice().execute({
                product: newProduct,
                ingredientRepository,
                productRepository,
            });

            if (!success) throw new Error('Failed updating super products price');

            return { success: true };
        } catch (e) {
            console.error(e);
            return { success: false };
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

export default UpdateProduct;
