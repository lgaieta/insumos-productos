import type Product from '@common/entities/Product';
import { GenericErrorResponse } from '@common/services/GenericErrorResponse';
import { GenericApiGETResponse, handleApiGET } from '@common/services/handleApiGET';
import MySQLProductRepository from '@productos/(lib)/services/MySQLProductRepository';

import { type NextRequest } from 'next/server';

export type ProductListApiResponse = GenericApiGETResponse<Product[]>;

export async function GET(request: NextRequest) {
    try {
        const productRepository = new MySQLProductRepository();
        const response: ProductListApiResponse = await handleApiGET({
            searchParams: request.nextUrl.searchParams,
            getData: async params =>
                await productRepository.getList({
                    filterText: params.filterText,
                    cursor: +params.cursor,
                    rowLimit: +params.rowLimit,
                }),
            getRowsCount: async params =>
                await productRepository.getProductsCount(params.filterText),
        });

        return Response.json(response);
    } catch (e) {
        console.error(e);
        return GenericErrorResponse();
    }
}
