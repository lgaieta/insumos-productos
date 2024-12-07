import type Material from '@common/entities/Material';

type Product = {
    id: ProductId;
    name: string;
    image: string | null;
    price: number;
    priceType: ProductPriceType;
    profit: number;
    link: string | null;
    ingredients: Ingredient[];
};

export enum ProductPriceType {
    Fixed = 'fixed',
    Dynamic = 'dynamic',
}

export default Product;

export type ProductId = number;

export enum IngredientType {
    Material = 'material',
    Product = 'product',
}

export type Ingredient = {
    type: IngredientType;
    item: Product | Material;
    amount: number;
};
