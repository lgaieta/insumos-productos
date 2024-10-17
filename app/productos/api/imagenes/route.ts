import type { ProductId } from '@common/entities/Product';
import { GenericErrorResponse } from '@common/services/GenericErrorResponse';
import { GenericApiGETResponse, handleApiGET } from '@common/services/handleApiGET';
import MySQLProductRepository from '@productos/(lib)/services/MySQLProductRepository';
import { type NextRequest } from 'next/server';

export type ProductImageListApiResponse = GenericApiGETResponse<{ id: ProductId; image: string }[]>;

export async function GET(request: NextRequest) {
    try {
        const productRepository = new MySQLProductRepository();
        const { data, total, nextCursor } = await handleApiGET({
            searchParams: request.nextUrl.searchParams,
            getData: async params =>
                await productRepository.getImageList({
                    filterText: params.filterText,
                    cursor: +params.cursor,
                    rowLimit: +params.rowLimit,
                }),
            getRowsCount: async params =>
                await productRepository.getProductsCount(params.filterText),
        });

        const response: ProductImageListApiResponse = {
            data,
            total,
            nextCursor,
        };

        return Response.json(response);
    } catch (e) {
        console.error(e);
        return GenericErrorResponse();
    }
}
