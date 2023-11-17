import Material from '@/(common)/entities/Material';
import { materialImageAdapter } from './materialImageAdapter';
import { DBMaterial } from '@common/services/DBMaterial';

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
