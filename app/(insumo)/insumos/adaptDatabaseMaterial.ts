import Material from '@/entities/Material';

type DBMaterial = {
    INSUMO_ID: number;
    NOMBRE: string;
    COSTO_UNITARIO: string;
    LINK: null | string;
};

export const adaptDatabaseMaterial = (
    incomingMaterial: DBMaterial,
): Material => {
    return {
        id: incomingMaterial.INSUMO_ID,
        name: incomingMaterial.NOMBRE,
        price: parseFloat(incomingMaterial.COSTO_UNITARIO),
        link: incomingMaterial.LINK,
        image: null,
    };
};

export const adaptDatabaseMaterialList = (materialsList: DBMaterial[]) =>
    materialsList.map(adaptDatabaseMaterial);
