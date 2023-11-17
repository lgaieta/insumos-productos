import Material from '@common/entities/Material';
import { Nullable } from '@common/utils/Nullable';

export const getEditedMaterialFromFormData = (
    formData: FormData,
): Nullable<Omit<Material, 'id'>> => {
    const name = formData.get('name');
    const file = formData.get('image');
    const price = formData.get('price');
    const link = formData.get('link');

    return {
        name: typeof name === 'string' ? name : null,
        image: file instanceof File ? file : null,
        price: typeof price === 'string' ? parseFloat(price) : null,
        link: typeof link === 'string' && link !== '' ? link : null,
    };
};
