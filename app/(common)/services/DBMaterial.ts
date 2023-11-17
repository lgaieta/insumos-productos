export type DBMaterial = {
    INSUMO_ID: number;
    NOMBRE: string;
    COSTO_UNITARIO: string;
    LINK: null | string;
    IMAGEN?: null | Buffer;
};

export type DBMaterialAsOutput = {
    INSUMO_ID: number;
    NOMBRE: string;
    COSTO_UNITARIO: number;
    LINK: null | string;
    IMAGEN?: null | Buffer;
};
