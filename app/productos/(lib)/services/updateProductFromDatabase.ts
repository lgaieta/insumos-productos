import { pool } from '@common/services/pool';
import { DBProduct } from '@productos/(lib)/services/getProductListFromDatabase';

export const updateProductFromDatabase = async (
    product: Partial<Omit<DBProduct, 'constructor'>>,
) => {
    const { PRODUCTO_ID, ...newProduct } = product;

    const { IMAGEN, ...productWithoutImage } = newProduct;

    return await pool.query('UPDATE PRODUCTO SET ? WHERE PRODUCTO_ID = ?', [
        IMAGEN ? newProduct : productWithoutImage,
        PRODUCTO_ID,
    ]);
};
