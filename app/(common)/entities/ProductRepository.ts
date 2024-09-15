import type Product from '@common/entities/Product';

interface ProductRepository {
    updatePrice(productId: Product['id']): Promise<void>;
    updatePriceRecursively(productId: Product['id']): Promise<void>;
}

export default ProductRepository;
