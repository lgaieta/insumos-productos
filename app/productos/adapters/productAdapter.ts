import { productImageAdapter } from './productImageAdapter';
import { DBProduct } from '@productos/api/services/getProductsListFromDatabase';

export const productAdapter = (incomingProduct: DBProduct) => {
    return {
        id: incomingProduct.PRODUCTO_ID,
        name: incomingProduct.NOMBRE,
        price: parseFloat(incomingProduct.COSTO_UNITARIO),
        link: incomingProduct.LINK,
        image: incomingProduct?.IMAGEN ? productImageAdapter(incomingProduct.IMAGEN) : null,
    };
};

export const productsListAdapter = (productsList: DBProduct[]) => productsList.map(productAdapter);
