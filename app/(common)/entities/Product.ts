export type ProductId = number;

type Product = {
    id: ProductId;
    name: string;
    image: Blob | string | null;
    price: number;
    link: string | null;
};

export default Product;
