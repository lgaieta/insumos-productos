import { DBMaterialImage } from '@insumos/services/getMaterialsImagesFromDatabase';

export const materialImageAdapter = (imageBuffer: DBMaterialImage['IMAGEN']) =>
    imageBuffer !== null && imageBuffer !== undefined
        ? `data:image/png;base64,${imageBuffer.toString('base64')}`
        : null;

export const materialImageListAdapter = (
    materialImageList: DBMaterialImage[],
): {} | { [id: number]: string } =>
    materialImageList.reduce(
        (acc, incomingImage) => ({
            ...acc,
            [incomingImage.INSUMO_ID]: materialImageAdapter(incomingImage.IMAGEN),
        }),
        {},
    );
