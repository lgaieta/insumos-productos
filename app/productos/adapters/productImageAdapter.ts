import { DBProductImage } from '@productos/api/services/getProductsImagesFromDatabase';

export const productImageAdapter = (imageBuffer: DBProductImage['IMAGEN']) =>
    imageBuffer !== null && imageBuffer !== undefined
        ? `data:image/png;base64,${imageBuffer.toString('base64')}`
        : null;

export const productsImageListAdapter = (
    productImageList: DBProductImage[],
): {} | { [id: number]: string } =>
    productImageList.reduce(
        (acc, incomingImage) => ({
            ...acc,
            [incomingImage.PRODUCTO_ID]: productImageAdapter(incomingImage.IMAGEN),
        }),
        {},
    );
