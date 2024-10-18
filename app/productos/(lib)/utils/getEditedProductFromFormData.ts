import Product from '@common/entities/Product';
import type ProductPriceType from '@common/entities/ProductPriceType';
import { blobToBase64 } from '@common/utils/blobToBase64';
import { Nullable } from '@common/utils/Nullable';

export const getEditedProductFromFormData = async (
    formData: FormData,
): Promise<Nullable<Omit<Product, 'id'>>> => {
    const name = formData.get('name');
    const image = formData.get('image');
    const price = formData.get('price');
    const profit = formData.get('profit');
    const link = formData.get('link');
    const priceType = formData.get('priceType');

    return {
        name: typeof name === 'string' ? name : null,
        image: image instanceof Blob && image.size > 0 ? await blobToBase64(image) : null,
        price: typeof price === 'string' ? parseFloat(price) : null,
        profit: typeof profit === 'string' ? parseFloat(profit) : null,
        priceType: typeof priceType === 'string' ? (priceType as ProductPriceType) : null,
        link: typeof link === 'string' && link !== '' ? link : null,
    };
};
