import type Product from '@common/entities/Product';
import type { ProductId } from '@common/entities/Product';
import type ProductRepository from '@common/entities/ProductRepository';
import { pool } from '@common/services/pool';
import MySQLIngredientRepository from '@productos/(lib)/services/MySQLIngredientRepository';
import { RowDataPacket } from 'mysql2';

export interface DBProduct extends RowDataPacket {
    PRODUCTO_ID: number;
    NOMBRE: string;
    COSTO_UNITARIO: string;
    LINK: null | string;
    GANANCIA: string;
    IMAGEN?: null | Buffer;
}

class MySQLProductRepository implements ProductRepository {
    async deleteById(productId: ProductId): Promise<void> {
        await pool.query('DELETE FROM PRODUCTO WHERE PRODUCTO_ID = ?', [productId]);
    }
    /**
     * Updates a product with the given data, but does not update the price.
     * @param newProduct The product data to update the product with.
     */
    async updateWithoutPrice(newProduct: Product): Promise<void> {
        const { COSTO_UNITARIO, ...data } = await this.updateProductAdapter(newProduct);
        await pool.query('UPDATE PRODUCTO SET ? WHERE PRODUCTO_ID = ?', [data, newProduct.id]);
    }

    async updatePrice(productId: ProductId, newPrice: Product['price']): Promise<void> {
        console.log(
            await pool.query('UPDATE PRODUCTO SET COSTO_UNITARIO = ? WHERE PRODUCTO_ID = ?', [
                String(newPrice),
                productId,
            ]),
        );
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

        await pool.query('UPDATE PRODUCTO SET COSTO_UNITARIO = ? WHERE PRODUCTO_ID = ?', [
            totalPrice,
            productId,
        ]);
    }

    private async updateProductAdapter(product: Product): Promise<Omit<DBProduct, 'constructor'>> {
        return {
            PRODUCTO_ID: product.id,
            NOMBRE: product.name,
            IMAGEN:
                typeof product.image === 'string'
                    ? Buffer.from(product.image, 'base64')
                    : product.image instanceof Blob
                    ? Buffer.from(await product.image.arrayBuffer())
                    : null,
            COSTO_UNITARIO: String(product.price),
            LINK: product.link,
        };
    }
}

export default MySQLProductRepository;
