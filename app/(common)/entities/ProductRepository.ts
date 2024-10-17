import type { ProductId } from '@common/entities/Product';
import type Product from '@common/entities/Product';

type QueryOptions = {
    filterText: string;
    cursor: number;
    rowLimit: number;
};

interface ProductRepository {
    getById(productId: ProductId): Promise<Product | null>;
    getList(options: QueryOptions): Promise<Product[]>;
    getProductsCount(filterText: string): Promise<number>;
    getImageList(options: QueryOptions): Promise<{ id: ProductId; image: string }[]>;
    create(newProduct: Product): Promise<ProductId>;
    update(newProduct: Partial<Product> & { id: ProductId }): Promise<void>;
    deleteById(productId: ProductId): Promise<void>;
}

export default ProductRepository;
