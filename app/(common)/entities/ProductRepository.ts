import type { ProductId } from '@common/entities/Product';
import type Product from '@common/entities/Product';

interface ProductRepository {
    updateWithoutPrice(newProduct: Product): Promise<void>;
    updatePrice(
        productId: ProductId,
        newPrice: Product['price'],
        newProfit: Product['profit'],
    ): Promise<void>;
    recalculatePrice(productId: Product['id']): Promise<void>;
    recalculatePriceRecursively(productId: Product['id']): Promise<void>;
}

export default ProductRepository;
