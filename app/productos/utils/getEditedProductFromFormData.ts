import Product from '@common/entities/Product';
import { Nullable } from '@common/utils/Nullable';

export const getEditedProductFromFormData = (formData: FormData): Nullable<Omit<Product, 'id'>> => {
    const name = formData.get('name');
    const image = formData.get('image');
    const price = formData.get('price');
    const link = formData.get('link');

    return {
        name: typeof name === 'string' ? name : null,
        image: image instanceof Blob && image.size > 0 ? image : null,
        price: typeof price === 'string' ? parseFloat(price) : null,
        link: typeof link === 'string' && link !== '' ? link : null,
    };
};
