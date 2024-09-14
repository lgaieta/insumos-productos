import { pool } from '@common/services/pool';
import { DBMaterial } from '@insumos/(lib)/services/getMaterialListFromDatabase';
import { RowDataPacket } from 'mysql2';

export type DBMaterialImage = Pick<DBMaterial, 'INSUMO_ID' | 'IMAGEN'> & RowDataPacket;

type Options = {
    filterText: string;
    cursor: number;
    rowLimit: number;
};

export const getMaterialsImagesFromDatabase = async ({ filterText, cursor, rowLimit }: Options) =>
    (
        await pool.query<DBMaterialImage[]>(
            'SELECT INSUMO_ID, IMAGEN FROM INSUMO WHERE NOMBRE LIKE ? LIMIT ?, ?',
            [`%${filterText}%`, cursor, rowLimit],
        )
    )[0];
