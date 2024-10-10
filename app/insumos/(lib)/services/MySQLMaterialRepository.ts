import type Material from '@common/entities/Material';
import type { MaterialId } from '@common/entities/Material';
import type MaterialRepository from '@common/entities/MaterialRepository';
import { pool } from '@common/services/pool';
import { bytesToBase64 } from '@common/utils/bytesToBase64';
import { ResultSetHeader, type RowDataPacket } from 'mysql2';

interface DBMaterial extends RowDataPacket {
    INSUMO_ID: number;
    NOMBRE: string;
    COSTO_UNITARIO: string;
    LINK: null | string;
    IMAGEN?: null | Buffer;
}

class MySQLMaterialRepository implements MaterialRepository {
    async delete(materialId: MaterialId): Promise<void> {
        await pool.query('DELETE FROM INSUMO WHERE INSUMO_ID = ?', [materialId]);
    }

    async getList(options: {
        filterText: string;
        cursor: number;
        rowLimit: number;
    }): Promise<Material[]> {
        const [result] = await pool.query<DBMaterial[]>(
            'SELECT INSUMO_ID, NOMBRE, COSTO_UNITARIO, LINK FROM INSUMO WHERE NOMBRE LIKE ? LIMIT ? OFFSET ?',
            [`%${options.filterText}%`, options.rowLimit, options.cursor],
        );

        return this.materialListAdapter(result);
    }

    async getMaterialsCount(filterText: string): Promise<number> {
        interface Result extends RowDataPacket {
            total: number;
        }

        const rowCountQuery = (
            await pool.query<Result[]>('SELECT COUNT(*) AS total FROM INSUMO WHERE NOMBRE LIKE ?', [
                `%${filterText}%`,
            ])
        )[0][0];

        return rowCountQuery.total;
    }

    async getById(materialId: MaterialId): Promise<Material | null> {
        const [result] = await pool.query<DBMaterial[]>(
            'SELECT * FROM INSUMO WHERE INSUMO_ID = ?',
            [materialId],
        );
        const foundMaterial = result.at(0);

        if (!foundMaterial) return null;

        return this.materialAdapter(foundMaterial);
    }

    async create(material: Material): Promise<Material> {
        const { name, price, image, link } = material;

        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO INSUMO (NOMBRE, COSTO_UNITARIO, IMAGEN, LINK) VALUES (?, ?, ?, ?)`,
            [name, price, image !== null ? Buffer.from(image, 'base64') : null, link],
        );

        return {
            ...material,
            id: result.insertId,
        };
    }

    async update(material: Material): Promise<Material> {
        const dbMaterial = {
            INSUMO_ID: material.id,
            NOMBRE: material.name,
            IMAGEN: material.image ? Buffer.from(material.image, 'base64') : null,
            COSTO_UNITARIO: String(material.price),
            LINK: material.link,
        };

        const { INSUMO_ID, ...newMaterial } = dbMaterial;

        const { IMAGEN, ...materialWithoutImage } = newMaterial;

        await pool.query('UPDATE INSUMO SET ? WHERE INSUMO_ID = ?', [
            IMAGEN ? newMaterial : materialWithoutImage,
            INSUMO_ID,
        ]);

        return material;
    }

    private materialAdapter = (incomingMaterial: DBMaterial): Material => {
        return {
            id: incomingMaterial.INSUMO_ID,
            name: incomingMaterial.NOMBRE,
            price: parseFloat(incomingMaterial.COSTO_UNITARIO),
            link: incomingMaterial.LINK,
            image: incomingMaterial?.IMAGEN
                ? bytesToBase64(JSON.parse(JSON.stringify(incomingMaterial.IMAGEN)).data)
                : null,
        };
    };

    private materialListAdapter = (materialList: DBMaterial[]) =>
        materialList.map(this.materialAdapter);
}

export default MySQLMaterialRepository;
