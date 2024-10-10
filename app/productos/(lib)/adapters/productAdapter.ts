import { DBProduct } from '@productos/(lib)/services/getProductListFromDatabase';

export const productAdapter = (incomingProduct: Omit<DBProduct, 'IMAGEN'>) => {
    return {
        id: incomingProduct.PRODUCTO_ID,
        name: incomingProduct.NOMBRE,
        price: parseFloat(incomingProduct.COSTO_UNITARIO),
        link: incomingProduct.LINK,
        image: incomingProduct?.IMAGEN || null,
        priceType: incomingProduct.TIPO_PRECIO,
    };
};

export const productListAdapter = (productsList: DBProduct[]) => productsList.map(productAdapter);
