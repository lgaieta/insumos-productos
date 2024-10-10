import type { MaterialId } from '@common/entities/Material';
import type Material from '@common/entities/Material';

type QueryOptions = {
    filterText: string;
    cursor: number;
    rowLimit: number;
};

interface MaterialRepository {
    delete(materialId: MaterialId): Promise<void>;
    getList(options: QueryOptions): Promise<Material[]>;
    getMaterialsCount(filterText: string): Promise<number>;
    getById(materialId: MaterialId): Promise<Material | null>;
    create(material: Material): Promise<Material>;
    update(material: Material): Promise<Material>;
}

export default MaterialRepository;
