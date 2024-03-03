import { DBMaterialAsOutput } from '@common/services/DBMaterial';
import { pool } from '@common/services/pool';

export const updateMaterialFromDatabase = async (material: Partial<DBMaterialAsOutput>) => {
    const { INSUMO_ID, ...newMaterial } = material;

    const { IMAGEN, ...materialWithoutImage } = newMaterial;

    return await pool.query('UPDATE INSUMO SET ? WHERE INSUMO_ID = ?', [
        IMAGEN ? newMaterial : materialWithoutImage,
        INSUMO_ID,
    ]);
};
