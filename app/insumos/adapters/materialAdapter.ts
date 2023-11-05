import Material from '@/(common)/entities/Material';
import { DBMaterial } from '../services/getMaterialsFromDatabase';

export const materialAdapter = (incomingMaterial: DBMaterial): Material => {
    return {
        id: incomingMaterial.INSUMO_ID,
        name: incomingMaterial.NOMBRE,
        price: parseFloat(incomingMaterial.COSTO_UNITARIO),
        link: incomingMaterial.LINK,
        image: null,
    };
};

export const materialListAdapter = (materialsList: DBMaterial[]) =>
    materialsList.map(materialAdapter);
