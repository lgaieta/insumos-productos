import { bytesToBase64 } from '@common/utils/bytesToBase64';
import { MaterialImageListApiResponse } from '@insumos/api/imagenes/route';

export const materialImageAdapter = (item: MaterialImageListApiResponse['data'][number]): string =>
    `data:image/png;base64,${bytesToBase64(item.IMAGEN!.data)}`;

export const materialImageListAdapter = (
    materialImageList: MaterialImageListApiResponse['data'],
): {} | { [id: number]: string } =>
    materialImageList.reduce(
        (acc, item) => ({
            ...acc,
            [item.INSUMO_ID]: materialImageAdapter(item),
        }),
        {},
    );
