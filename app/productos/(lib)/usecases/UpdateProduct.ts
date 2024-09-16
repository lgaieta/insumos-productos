import type Product from '@common/entities/Product';
import type ProductRepository from '@common/entities/ProductRepository';

class UpdateProduct {
    static async execute({
        newProduct,
        productRepository,
        currentProduct,
    }: {
        newProduct: Product;
        currentProduct: Product;
        productRepository: ProductRepository;
    }) {
        try {
            await productRepository.updateWithoutPrice(newProduct);
            if (newProduct.price !== currentProduct.price) {
                console.log(newProduct, currentProduct);
                // TODO: add profit logic
                await productRepository.updatePrice(currentProduct.id, newProduct.price);
                await productRepository.recalculatePriceRecursively(currentProduct.id);
            }
            return { success: true };
        } catch (e) {
            return { success: false };
        }
    }
}

export default UpdateProduct;
