import type Product from '@common/entities/Product';
import type { ProductId } from '@common/entities/Product';
import type ProductRepository from '@common/entities/ProductRepository';

class GetProduct {
    static async execute({
        productId,
        productRepository,
    }: {
        productId: ProductId;
        productRepository: ProductRepository;
    }): Promise<{ success: false } | { success: true; product: Product }> {
        try {
            const product = await productRepository.getById(productId);
            if (!product) return { success: false };
            return { success: true, product } as const;
        } catch (e) {
            console.error(e);
            return { success: false };
        }
    }
}

export default GetProduct;
