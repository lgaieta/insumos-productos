import { pool } from '@common/services/pool';
import { DBMaterial } from '@insumos/api/services/getMaterialsListFromDatabase';

export const updateMaterialFromDatabase = async (material: Partial<DBMaterial>) => {
    const { INSUMO_ID, ...newMaterial } = material;

    const { IMAGEN, ...materialWithoutImage } = newMaterial;

    return await pool.query('UPDATE INSUMO SET ? WHERE INSUMO_ID = ?', [
        IMAGEN ? newMaterial : materialWithoutImage,
        INSUMO_ID,
    ]);
};
