import type ProductPriceType from '@common/entities/ProductPriceType';

export type ProductId = number;

type Product = {
    id: ProductId;
    name: string;
    image: string | null;
    price: number;
    priceType: ProductPriceType;
    profit: number;
    link: string | null;
};

export default Product;
