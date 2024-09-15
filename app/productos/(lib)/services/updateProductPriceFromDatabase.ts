import { pool } from '@common/services/pool';
import { DBProduct } from '@productos/(lib)/services/getProductListFromDatabase';
import { getIngredientsFromDatabaseById } from './getIngredientsFromDatabaseById';
import { ingredientsListAdapter } from '@productos/(lib)/adapters/ingredientAdapter';

export const updateProductPriceFromDatabase = async (productId: DBProduct['PRODUCTO_ID']) => {
    const ingredients = ingredientsListAdapter(await getIngredientsFromDatabaseById(productId));
    const newPrice = ingredients.reduce((acc, current) => acc + current.unit_price * current.amount, 0);

    console.log(newPrice)

    return await pool.query('UPDATE PRODUCTO SET COSTO_UNITARIO = ? WHERE PRODUCTO_ID = ?', [
        newPrice, productId
    ]);
};
