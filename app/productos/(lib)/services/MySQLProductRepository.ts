import type Product from '@common/entities/Product';
import type { ProductId } from '@common/entities/Product';
import type ProductRepository from '@common/entities/ProductRepository';
import { pool } from '@common/services/pool';
import MySQLIngredientRepository from '@productos/(lib)/services/MySQLIngredientRepository';
import { RowDataPacket } from 'mysql2';

class MySQLProductRepository implements ProductRepository {
    /**
     * Updates the price of a product and all its super products recursively.
     * @param productId The id of the product to update.
     */
    async updatePriceRecursively(productId: Product['id']): Promise<void> {
        await this.updatePrice(productId);

        const [superProducts] = await pool.query<RowDataPacket[]>(
            `SELECT PRODUCTO_ID FROM FORMULA_DETALLE WHERE INGREDIENTE_ID = ? AND TIPO_INGREDIENTE = 'producto'`,
            [productId],
        );

        for (const superProduct of superProducts) {
            console.log(superProduct);
            await this.updatePriceRecursively(superProduct['PRODUCTO_ID']);
        }
    }

    async updatePrice(productId: ProductId): Promise<void> {
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
}

export default MySQLProductRepository;
