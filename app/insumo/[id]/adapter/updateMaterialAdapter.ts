import Material from '@common/entities/Material';
import { DBMaterial } from '@common/services/DBMaterial';

type Output = Omit<DBMaterial, 'COSTO_UNITARIO'> & { COSTO_UNITARIO: number };

type Input = Omit<Material, 'image'> & { image: File | null };

export const updateMaterialAdapter = async (material: Input): Promise<Output> => ({
    INSUMO_ID: material.id,
    NOMBRE: material.name,
    IMAGEN: material.image ? Buffer.from(await material.image.arrayBuffer()) : null,
    COSTO_UNITARIO: material.price,
    LINK: material.link,
});
