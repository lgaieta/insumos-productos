import { Pool } from 'mysql2/promise';

type IncomingMaterial = {
    name: string;
    price: number;
    image: Blob | null;
    link: string | null;
};

export const saveMaterialInDatabase = async (pool: Pool, materialData: IncomingMaterial) => {
    const { name, price, image, link } = materialData;

    await pool.query(
        `INSERT INTO INSUMO (NOMBRE, COSTO_UNITARIO, IMAGEN, LINK) VALUES (?, ?, ?, ?)`,
        [name, price, image !== null ? Buffer.from(await image.arrayBuffer()) : null, link],
    );
};
