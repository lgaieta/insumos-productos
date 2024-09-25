import type ProductPriceType from '@common/entities/ProductPriceType';

export type ProductId = number;

type Product = {
    id: ProductId;
    name: string;
    image: Blob | string | null;
    price: number;
    price_type: ProductPriceType;
    profit: number;
    link: string | null;
};

export default Product;
