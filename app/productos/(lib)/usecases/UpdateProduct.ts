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

            const dbProduct = await productRepository.getById(newProduct.id);

            if (dbProduct?.priceType !== newProduct.priceType) {
                const ingredients = await ingredientRepository.getByProductId(newProduct.id);
                if (ingredients.length > 0) {
                    return {
                        success: false,
                        message:
                            'No se puede cambiar el tipo de precio de un producto con ingredientes asociados, elimine los ingredientes y luego cambie el tipo.',
                    };
                }
            }

            const newProductPrice =
                newProduct.priceType === ProductPriceType.Fixed
                    ? newProduct.price
                    : await this.calculateProductPrice({
                          product: newProduct,
                          ingredientRepository,
                      });

            await productRepository.update({ ...newProduct, price: newProductPrice });

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
