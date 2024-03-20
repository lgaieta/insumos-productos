import Product from '@common/entities/Product';
import { DBProduct } from '@productos/services/getProductsListFromDatabase';

type Input = Omit<Product, 'image'> & { image: Blob | null };

export const updateProductAdapter = async (
    product: Input,
): Promise<Omit<DBProduct, 'constructor'>> => ({
    PRODUCTO_ID: product.id,
    NOMBRE: product.name,
    IMAGEN: product.image ? Buffer.from(await product.image.arrayBuffer()) : null,
    COSTO_UNITARIO: String(product.price),
    LINK: product.link,
});
