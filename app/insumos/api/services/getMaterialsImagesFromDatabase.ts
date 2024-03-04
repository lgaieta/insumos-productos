import { pool } from '@common/services/pool';
import { RowDataPacket } from 'mysql2';
import { DBMaterial } from './getMaterialsListFromDatabase';

export type DBMaterialImage = Pick<DBMaterial, 'INSUMO_ID' | 'IMAGEN'> & RowDataPacket;

type Options = {
    filterText: string;
    page: number;
    rowsPerPage: number;
};

export const getMaterialsImagesFromDatabase = async ({ filterText, page, rowsPerPage }: Options) =>
    (
        await pool.query<DBMaterialImage[]>(
            'SELECT INSUMO_ID, IMAGEN FROM INSUMO WHERE NOMBRE LIKE ? LIMIT ?, ?',
            [`%${filterText}%`, (page - 1) * rowsPerPage, rowsPerPage],
        )
    )[0];
