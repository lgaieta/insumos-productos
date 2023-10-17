import { Pool } from 'mysql2/promise';

type IncomingMaterial = {
    name: string;
    price: number;
    image: File;
    link: string | null;
};

export const saveMaterialInDatabase = async (pool: Pool, materialData: IncomingMaterial) => {
    const { name, price, image, link } = materialData;

    await pool.query(
        `INSERT INTO INSUMO (NOMBRE, COSTO_UNITARIO, IMAGEN, LINK) VALUES (?, ?,
            ${image !== null ? '?' : 'NULL'}, ${link ? `"${link}"` : 'NULL'})`,
        [name, price, image !== null ? Buffer.from(await image.arrayBuffer()) : undefined],
    );
};
