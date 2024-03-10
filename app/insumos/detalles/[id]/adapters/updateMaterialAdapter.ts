import Material from '@common/entities/Material';
import { DBMaterial } from '@insumos/api/services/getMaterialsListFromDatabase';

type Input = Omit<Material, 'image'> & { image: Blob | null };

export const updateMaterialAdapter = async (
    material: Input,
): Promise<Omit<DBMaterial, 'constructor'>> => ({
    INSUMO_ID: material.id,
    NOMBRE: material.name,
    IMAGEN: material.image ? Buffer.from(await material.image.arrayBuffer()) : null,
    COSTO_UNITARIO: String(material.price),
    LINK: material.link,
});
