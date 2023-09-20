import { Pool } from 'mysql2/promise';

type IncomingMaterial = {
    name: string;
    price: number;
    image: File;
};

export const saveMaterialInDatabase = async (
    pool: Pool,
    materialData: IncomingMaterial,
) => {
    const { name, price, image } = materialData;

    if (image !== null) {
        await pool.query(
            'INSERT INTO INSUMO (NOMBRE, IMAGEN, COSTO_UNITARIO) VALUES (?, ?, ?)',
            [name, await image.text(), price],
        );
    } else
        await pool.query(
            'INSERT INTO INSUMO (NOMBRE, COSTO_UNITARIO) VALUES (?, ?)',
            [name, price],
        );
};
