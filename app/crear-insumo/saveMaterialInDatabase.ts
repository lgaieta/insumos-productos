import { Pool } from 'mysql2/promise';

type IncomingMaterial = {
    name: string;
    price: number;
    image: File;
    link: string | null;
};

export const saveMaterialInDatabase = async (
    pool: Pool,
    materialData: IncomingMaterial,
) => {
    const { name, price, image, link } = materialData;

    await pool.query(
        `INSERT INTO INSUMO (NOMBRE, IMAGEN, COSTO_UNITARIO, LINK) VALUES (?, ${
            image !== null ? await image.text() : 'NULL'
        }, ?, ${link || 'NULL'})`,
        [name, price],
    );
};
