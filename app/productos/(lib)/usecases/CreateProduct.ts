import type Product from '@common/entities/Product';
import type ProductRepository from '@common/entities/ProductRepository';

class CreateProduct {
    static async execute({
        newProduct,
        productRepository,
    }: {
        newProduct: Product;
        productRepository: ProductRepository;
    }) {
        return await productRepository.create(newProduct);
    }
}

export default CreateProduct;
