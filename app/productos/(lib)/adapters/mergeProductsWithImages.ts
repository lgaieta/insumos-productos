import Product from '@/(common)/entities/Product';

export const mergeProductsWithImages = (products: Product[], images: { [id: number]: string }) =>
    products.map(product => ({ ...product, image: images[product.id] || null }));
