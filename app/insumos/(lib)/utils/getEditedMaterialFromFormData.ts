import Material from '@common/entities/Material';
import { blobToBase64 } from '@common/utils/blobToBase64';
import { Nullable } from '@common/utils/Nullable';

export const getEditedMaterialFromFormData = async (
    formData: FormData,
): Promise<Nullable<Omit<Material, 'id'>>> => {
    const name = formData.get('name');
    const image = formData.get('image');
    const price = formData.get('price');
    const link = formData.get('link');

    return {
        name: typeof name === 'string' ? name : null,
        image: image instanceof Blob && image.size > 0 ? await blobToBase64(image) : null,
        price: typeof price === 'string' ? parseFloat(price) : null,
        link: typeof link === 'string' && link !== '' ? link : null,
    };
};
