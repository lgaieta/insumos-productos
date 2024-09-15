import type IngredientRepository from '@common/entities/IngredientRepository';
import type NewIngredientsList from '@common/entities/NewIngredientsList';
import { pool } from '@common/services/pool';
import type { DBIngredient } from '@productos/(lib)/services/getIngredientsFromDatabaseById';

export type NewDBIngredient = [
    productId: DBIngredient['PRODUCTO_ID'],
    componentId: DBIngredient['INGREDIENTE_ID'],
    type: DBIngredient['TIPO_INGREDIENTE'],
];

class MySQLIngredientRepository implements IngredientRepository {
    async saveList(list: NewIngredientsList) {
        const materialIngredients: [number, number, string][] = list.materialList.map(
            materialId => [list.productId, materialId, 'insumo'],
        );

        const subproductIngredients: [number, number, string][] = list.subproductList.map(
            subproductId => [list.productId, subproductId, 'producto'],
        );

        const ingredients: NewDBIngredient[] = [...materialIngredients, ...subproductIngredients];

        await pool.query(
            'INSERT IGNORE INTO FORMULA_DETALLE (PRODUCTO_ID, INGREDIENTE_ID, TIPO_INGREDIENTE) VALUES ? ',
            [ingredients],
        );
    }
}

export default MySQLIngredientRepository;
