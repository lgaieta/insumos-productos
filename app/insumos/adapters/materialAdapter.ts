import { materialImageAdapter } from '@insumos/adapters/materialImageAdapter';
import { DBMaterial } from '@insumos/services/getMaterialListFromDatabase';

export const materialAdapter = (incomingMaterial: Omit<DBMaterial, 'IMAGEN'>) => {
    return {
        id: incomingMaterial.INSUMO_ID,
        name: incomingMaterial.NOMBRE,
        price: parseFloat(incomingMaterial.COSTO_UNITARIO),
        link: incomingMaterial.LINK,
        image: incomingMaterial?.IMAGEN || null,
    };
};

export const materialListAdapter = (materialList: DBMaterial[]) =>
    materialList.map(materialAdapter);
