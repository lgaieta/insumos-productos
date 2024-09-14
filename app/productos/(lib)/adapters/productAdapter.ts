import { productImageAdapter } from '@productos/adapters/productImageAdapter';
import { DBProduct } from '@productos/services/getProductListFromDatabase';

export const productAdapter = (incomingProduct: Omit<DBProduct, 'IMAGEN'>) => {
    return {
        id: incomingProduct.PRODUCTO_ID,
        name: incomingProduct.NOMBRE,
        price: parseFloat(incomingProduct.COSTO_UNITARIO),
        link: incomingProduct.LINK,
        image: incomingProduct?.IMAGEN || null,
    };
};

export const productListAdapter = (productsList: DBProduct[]) => productsList.map(productAdapter);
