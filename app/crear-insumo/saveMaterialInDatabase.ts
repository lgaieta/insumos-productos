import { Pool } from 'mysql2/promise';
import Material from './Material';

type IncomingMaterial = Omit<Material, 'id'>;

export const saveMaterialInDatabase = async (
    pool: Pool,
    materialData: IncomingMaterial,
) => {
    const { name, price } = materialData;

    await pool.query(
        'INSERT INTO INSUMO (NOMBRE, COSTO_UNITARIO) VALUES (?, ?)',
        [name, price],
    );
};
