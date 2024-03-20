import { pool } from '@common/services/pool';
import { DBMaterial } from '@insumos/services/getMaterialsListFromDatabase';

export const updateMaterialFromDatabase = async (
    material: Partial<Omit<DBMaterial, 'constructor'>>,
) => {
    const { INSUMO_ID, ...newMaterial } = material;

    const { IMAGEN, ...materialWithoutImage } = newMaterial;

    return await pool.query('UPDATE INSUMO SET ? WHERE INSUMO_ID = ?', [
        IMAGEN ? newMaterial : materialWithoutImage,
        INSUMO_ID,
    ]);
};
