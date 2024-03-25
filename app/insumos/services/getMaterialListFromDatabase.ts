import { pool } from '@common/services/pool';
import { RowDataPacket } from 'mysql2';

export interface DBMaterial extends RowDataPacket {
    INSUMO_ID: number;
    NOMBRE: string;
    COSTO_UNITARIO: string;
    LINK: null | string;
    IMAGEN?: null | Buffer;
}

type Options = {
    filterText: string;
    cursor: number;
    rowLimit: number;
};

export const getMaterialListFromDatabase = async ({ filterText, cursor, rowLimit }: Options) =>
    (
        await pool.query<DBMaterial[]>(
            'SELECT INSUMO_ID, NOMBRE, COSTO_UNITARIO, LINK FROM INSUMO WHERE NOMBRE LIKE ? LIMIT ?, ?',
            [`%${filterText}%`, cursor, rowLimit],
        )
    )[0];
