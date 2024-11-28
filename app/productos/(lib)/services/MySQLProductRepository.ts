import type Product from '@common/entities/Product';
import type { ProductId } from '@common/entities/Product';
import ProductPriceType from '@common/entities/ProductPriceType';
import type ProductRepository from '@common/entities/ProductRepository';
import { pool } from '@common/services/pool';
import { bytesToBase64 } from '@common/utils/bytesToBase64';
import { RowDataPacket, type ResultSetHeader } from 'mysql2';

export interface DBProductResult extends RowDataPacket {
    PRODUCTO_ID: number;
    NOMBRE: string;
    COSTO_UNITARIO: string;
    LINK: null | string;
    GANANCIA: string;
    IMAGEN?: null | Buffer;
    TIPO_PRECIO: 'fijo' | 'dinamico';
}

interface DBProduct {
    PRODUCTO_ID: number;
    NOMBRE: string;
    COSTO_UNITARIO: number;
    LINK: null | string;
    GANANCIA: number;
    TIPO_PRECIO: 'fijo' | 'dinamico';
    IMAGEN?: null | Buffer;
}

class MySQLProductRepository implements ProductRepository {
    async getImageList(options: {
        filterText: string;
        cursor: number;
        rowLimit: number;
    }): Promise<{ id: ProductId; image: string }[]> {
        interface Result extends RowDataPacket {
            id: number;
            image: Blob;
        }
        const [rows] = await pool.query<Result[]>(
            `SELECT PRODUCTO_ID as id, IMAGEN as image FROM PRODUCTO WHERE NOMBRE LIKE ? LIMIT ? OFFSET ?`,
            [`%${options.filterText}%`, options.rowLimit, options.cursor],
        );

        return rows.map(row => ({
            id: row.id,
            image: bytesToBase64(JSON.parse(JSON.stringify(row.image)).data),
        }));
    }

    async getList(options: {
        filterText: string;
        cursor: number;
        rowLimit: number;
    }): Promise<Product[]> {
        const [rows] = await pool.query<DBProductResult[]>(
            'SELECT PRODUCTO_ID, NOMBRE, COSTO_UNITARIO, LINK FROM PRODUCTO WHERE NOMBRE LIKE ? LIMIT ? OFFSET ?',
            [`%${options.filterText}%`, options.rowLimit, options.cursor],
        );

        return this.productListAdapter(rows);
    }

    async getProductsCount(filterText: string): Promise<number> {
        interface Result extends RowDataPacket {
            total: number;
        }
        const rowCountQuery = (
            await pool.query<Result[]>(
                'SELECT COUNT(*) AS total FROM PRODUCTO WHERE NOMBRE LIKE ?',
                [`%${filterText}%`],
            )
        )[0][0];

        return rowCountQuery.total;
    }

    async getById(productId: ProductId): Promise<Product | null> {
        const [[result]] = await pool.query<DBProductResult[]>(
            'SELECT * FROM PRODUCTO WHERE PRODUCTO_ID = ?',
            [productId],
        );

        if (!result) return null;
        return this.productAdapter(result);
    }

    async create(newProduct: Product): Promise<ProductId> {
        const { PRODUCTO_ID, ...data } = await this.updateProductAdapter(newProduct);
        const [{ insertId }] = await pool.query<ResultSetHeader>('INSERT INTO PRODUCTO SET ?', [
            data,
        ]);
        return insertId;
    }

    async deleteById(productId: ProductId): Promise<void> {
        await pool.query('DELETE FROM PRODUCTO WHERE PRODUCTO_ID = ?', [productId]);
    }

    async update(newProduct: Partial<Product> & { id: ProductId }): Promise<void> {
        const data = await this.updatePartialProductAdapter(newProduct);
        await pool.query('UPDATE PRODUCTO SET ? WHERE PRODUCTO_ID = ?', [data, newProduct.id]);
    }

    private productAdapter = (incomingProduct: DBProductResult): Product => {
        return {
            id: incomingProduct.PRODUCTO_ID,
            name: incomingProduct.NOMBRE,
            price: parseFloat(incomingProduct.COSTO_UNITARIO),
            profit: parseFloat(incomingProduct.GANANCIA),
            priceType:
                incomingProduct.TIPO_PRECIO === 'fijo'
                    ? ProductPriceType.Fixed
                    : ProductPriceType.Dynamic,
            link: incomingProduct.LINK,
            image: null,
        };
    };

    private productListAdapter = (productsList: DBProductResult[]) =>
        productsList.map(this.productAdapter);

    private async updateProductAdapter(product: Product): Promise<DBProduct> {
        return {
            PRODUCTO_ID: product.id,
            NOMBRE: product.name,
            IMAGEN: product.image ? Buffer.from(product.image, 'base64') : null,
            COSTO_UNITARIO: product.price,
            GANANCIA: product.profit,
            TIPO_PRECIO: product.priceType === ProductPriceType.Fixed ? 'fijo' : 'dinamico',
            LINK: product.link,
        };
    }

    private async updatePartialProductAdapter(
        product: Partial<Product> & { id: ProductId },
    ): Promise<Partial<DBProduct>> {
        const adaptedProduct = {
            PRODUCTO_ID: product.id,
            NOMBRE: product.name,
            IMAGEN: product.image ? Buffer.from(product.image, 'base64') : undefined,
            COSTO_UNITARIO: product.price,
            GANANCIA: product.profit,
            TIPO_PRECIO: !product.priceType
                ? undefined
                : product.priceType === ProductPriceType.Fixed
                ? 'fijo'
                : 'dinamico',
            LINK: product.link,
        };
        const filteredUndefinedProperties = Object.fromEntries(
            Object.entries(adaptedProduct).filter(([key, value]) => value !== undefined),
        );
        return filteredUndefinedProperties;
    }
}

export default MySQLProductRepository;
