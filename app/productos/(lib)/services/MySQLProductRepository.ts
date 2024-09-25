import type Product from '@common/entities/Product';
import type { ProductId } from '@common/entities/Product';
import ProductPriceType from '@common/entities/ProductPriceType';
import type ProductRepository from '@common/entities/ProductRepository';
import { pool } from '@common/services/pool';
import MySQLIngredientRepository from '@productos/(lib)/services/MySQLIngredientRepository';
import { RowDataPacket, type ResultSetHeader } from 'mysql2';

export interface DBProductResult extends RowDataPacket {
    PRODUCTO_ID: number;
    NOMBRE: string;
    COSTO_UNITARIO: string;
    LINK: null | string;
    GANANCIA: string;
    IMAGEN?: null | Buffer;
    TIPO_PRECIO: 'fijo' | 'dinamico';
}

interface DBProduct {
    PRODUCTO_ID: number;
    NOMBRE: string;
    COSTO_UNITARIO: number;
    LINK: null | string;
    GANANCIA: number;
    TIPO_PRECIO: 'fijo' | 'dinamico';
    IMAGEN?: null | Buffer;
}

class MySQLProductRepository implements ProductRepository {
    async getById(productId: ProductId): Promise<Product | null> {
        const [[result]] = await pool.query<DBProductResult[]>(
            'SELECT * FROM PRODUCTO WHERE PRODUCTO_ID = ?',
            [productId],
        );

        if (!result) return null;
        return this.productAdapter(result);
    }

    async create(newProduct: Product): Promise<ProductId> {
        const { PRODUCTO_ID, ...data } = await this.updateProductAdapter(newProduct);
        const [{ insertId }] = await pool.query<ResultSetHeader>('INSERT INTO PRODUCTO SET ?', [
            data,
        ]);
        return insertId;
    }

    async deleteById(productId: ProductId): Promise<void> {
        await pool.query('DELETE FROM PRODUCTO WHERE PRODUCTO_ID = ?', [productId]);
    }
    async update(newProduct: Product): Promise<void> {
        const data = await this.updateProductAdapter(newProduct);
        await pool.query('UPDATE PRODUCTO SET ? WHERE PRODUCTO_ID = ?', [data, newProduct.id]);
    }

    /**
     * Updates the price of a product and all its super products recursively.
     * @param productId The id of the product to update.
     */
    async recalculatePriceRecursively(productId: Product['id']): Promise<void> {
        await this.recalculatePrice(productId);

        const [superProducts] = await pool.query<RowDataPacket[]>(
            `SELECT PRODUCTO_ID FROM FORMULA_DETALLE WHERE INGREDIENTE_ID = ? AND TIPO_INGREDIENTE = 'producto'`,
            [productId],
        );

        for (const superProduct of superProducts)
            await this.recalculatePriceRecursively(superProduct['PRODUCTO_ID']);
    }

    async recalculatePrice(productId: ProductId): Promise<void> {
        const ingredients = await new MySQLIngredientRepository().getByProductId(productId);

        const totalPrice = ingredients.reduce(
            (total, ingredient) => total + ingredient.unitPrice * ingredient.amount,
            0,
        );

        await this.updatePrice(productId, totalPrice);
    }

    private productAdapter = (incomingProduct: DBProductResult): Product => {
        return {
            id: incomingProduct.PRODUCTO_ID,
            name: incomingProduct.NOMBRE,
            price: parseFloat(incomingProduct.COSTO_UNITARIO),
            profit: parseFloat(incomingProduct.GANANCIA),
            price_type:
                incomingProduct.TIPO_PRECIO === 'fijo'
                    ? ProductPriceType.Fixed
                    : ProductPriceType.Dynamic,
            link: incomingProduct.LINK,
            image: null,
        };
    };

    private productListAdapter = (productsList: DBProductResult[]) =>
        productsList.map(this.productAdapter);

    private async updateProductAdapter(product: Product): Promise<DBProduct> {
        return {
            PRODUCTO_ID: product.id,
            NOMBRE: product.name,
            IMAGEN:
                typeof product.image === 'string'
                    ? Buffer.from(product.image, 'base64')
                    : product.image instanceof Blob
                    ? Buffer.from(await product.image.arrayBuffer())
                    : null,
            COSTO_UNITARIO: product.price,
            GANANCIA: product.profit,
            TIPO_PRECIO: product.price_type === ProductPriceType.Fixed ? 'fijo' : 'dinamico',
            LINK: product.link,
        };
    }
}

export default MySQLProductRepository;
