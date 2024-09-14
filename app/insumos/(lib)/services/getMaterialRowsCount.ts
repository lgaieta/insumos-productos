import { pool } from '@common/services/pool';
import { RowDataPacket } from 'mysql2';

interface Result extends RowDataPacket {
    total: number;
}

export const getMaterialRowsCount = async (filterText: string) => {
    const rowCountQuery = (
        await pool.query<Result[]>('SELECT COUNT(*) AS total FROM INSUMO WHERE NOMBRE LIKE ?', [
            `%${filterText}%`,
        ])
    )[0][0];

    return rowCountQuery.total;
};
