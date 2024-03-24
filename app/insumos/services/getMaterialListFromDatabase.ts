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
    page: number;
    rowsPerPage: number;
};

export const getMaterialListFromDatabase = async ({ filterText, page, rowsPerPage }: Options) =>
    (
        await pool.query<DBMaterial[]>(
            'SELECT INSUMO_ID, NOMBRE, COSTO_UNITARIO, LINK FROM INSUMO WHERE NOMBRE LIKE ? LIMIT ?, ?',
            [`%${filterText}%`, (page - 1) * rowsPerPage, rowsPerPage],
        )
    )[0];
