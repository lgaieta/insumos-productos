import { materialImageAdapter } from '@insumos/adapters/materialImageAdapter';
import { DBMaterial } from '@insumos/services/getMaterialsListFromDatabase';

export const materialAdapter = (incomingMaterial: DBMaterial) => {
    return {
        id: incomingMaterial.INSUMO_ID,
        name: incomingMaterial.NOMBRE,
        price: parseFloat(incomingMaterial.COSTO_UNITARIO),
        link: incomingMaterial.LINK,
        image: incomingMaterial?.IMAGEN ? materialImageAdapter(incomingMaterial.IMAGEN) : null,
    };
};

export const materialListAdapter = (materialsList: DBMaterial[]) =>
    materialsList.map(materialAdapter);
