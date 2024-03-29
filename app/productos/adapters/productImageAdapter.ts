import { bytesToBase64 } from '@common/utils/bytesToBase64';
import { ProductImageListApiResponse } from '@productos/api/imagenes/route';

export const productImageAdapter = (item: ProductImageListApiResponse['data'][number]): string =>
    `data:image/png;base64,${bytesToBase64(item.IMAGEN!.data)}`;

export const productImageListAdapter = (
    productImageList: ProductImageListApiResponse['data'],
): {} | { [id: number]: string } =>
    productImageList.reduce(
        (acc, item) => ({
            ...acc,
            [item.PRODUCTO_ID]: productImageAdapter(item),
        }),
        {},
    );
