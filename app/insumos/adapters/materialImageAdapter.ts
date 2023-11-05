import { IncomingImage } from '../services/getMaterialImagesFromDatabase';

export const materialImageAdapter = (imageBuffer: IncomingImage['IMAGEN']) =>
    imageBuffer !== null ? `data:image/png;base64,${imageBuffer.toString('base64')}` : null;

export const materialImageListAdapter = (
    materialImageList: IncomingImage[],
): {} | { [id: number]: string } =>
    materialImageList.reduce(
        (acc, incomingImage) => ({
            ...acc,
            [incomingImage.INSUMO_ID]: materialImageAdapter(incomingImage.IMAGEN),
        }),
        {},
    );
