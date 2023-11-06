import Material from '@/(common)/entities/Material';
import { DBMaterial } from '../services/getMaterialsFromDatabase';
import { materialImageAdapter } from './materialImageAdapter';

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
