type IncomingImage = {
    INSUMO_ID: number;
    IMAGEN: null | { type: string; data: number[] };
};

export const materialImageAdapter = (imageObject: IncomingImage['IMAGEN']) =>
    imageObject !== null
        ? `data:image/jpeg;base64,${Buffer.from(imageObject.data).toString('base64')}`
        : null;

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
