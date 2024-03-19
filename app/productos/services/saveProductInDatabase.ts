import { Pool } from 'mysql2/promise';

type IncomingProduct = {
    name: string;
    price: number;
    image: Blob | null;
    link: string | null;
};

export const saveProductInDatabase = async (pool: Pool, productData: IncomingProduct) => {
    const { name, price, image, link } = productData;

    await pool.query(
        `INSERT INTO PRODUCTO (NOMBRE, COSTO_UNITARIO, IMAGEN, LINK) VALUES (?, ?, ?, ?)`,
        [name, price, image !== null ? Buffer.from(await image.arrayBuffer()) : null, link],
    );
};
