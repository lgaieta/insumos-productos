import type { ProductId } from '@common/entities/Product';
import type Product from '@common/entities/Product';

interface ProductRepository {
    getById(productId: ProductId): Promise<Product | null>;
    create(newProduct: Product): Promise<ProductId>;
    update(newProduct: Product): Promise<void>;
    deleteById(productId: ProductId): Promise<void>;
}

export default ProductRepository;
