import type { IngredientId } from '@common/entities/Ingredient';
import type Ingredient from '@common/entities/Ingredient';
import type IngredientRepository from '@common/entities/IngredientRepository';
import IngredientType from '@common/entities/IngredientType';
import type NewIngredientsList from '@common/entities/NewIngredientsList';
import { pool } from '@common/services/pool';
import type { RowDataPacket } from 'mysql2';

type NewDBIngredient = [
    productId: DBIngredient['PRODUCTO_ID'],
    componentId: DBIngredient['INGREDIENTE_ID'],
    type: DBIngredient['TIPO_INGREDIENTE'],
];

export interface DBIngredient extends RowDataPacket {
    FORMULA_DETALLE_ID: number;
    PRODUCTO_ID: number;
    INGREDIENTE_ID: number;
    TIPO_INGREDIENTE: string;
    CANTIDAD: string;
    INSUMO_NOMBRE: string | null;
    SUBPRODUCTO_NOMBRE: string | null;
    SUBPRODUCTO_COSTO: number;
    INSUMO_COSTO: number;
}

class MySQLIngredientRepository implements IngredientRepository {
    async getByComponentId(componentId: number): Promise<Ingredient | null> {
        const [result] = await pool.query<DBIngredient[]>(
            'SELECT * FROM FORMULA_DETALLE WHERE INGREDIENTE_ID = ?',
            [componentId],
        );

        if (result.length < 1) return null;

        return this.ingredientAdapter(result[0]);
    }

    async getById(ingredientId: IngredientId): Promise<Ingredient | null> {
        const [result] = await pool.query<DBIngredient[]>(
            'SELECT * FROM FORMULA_DETALLE WHERE FORMULA_DETALLE_ID = ?',
            [ingredientId],
        );

        if (result.length < 1) return null;

        return this.ingredientAdapter(result[0]);
    }

    async updateAmount(ingredientId: number, amount: number): Promise<void> {
        await pool.query('UPDATE FORMULA_DETALLE SET CANTIDAD = ? WHERE FORMULA_DETALLE_ID = ?', [
            amount,
            ingredientId,
        ]);
    }

    async deleteByProductId(productId: number): Promise<void> {
        await pool.query('DELETE FROM FORMULA_DETALLE WHERE PRODUCTO_ID = ?', [productId]);
    }

    async deleteByComponentId(componentId: number): Promise<void> {
        await pool.query('DELETE FROM FORMULA_DETALLE WHERE INGREDIENTE_ID = ?', [componentId]);
    }

    async deleteById(ingredientId: IngredientId): Promise<void> {
        await pool.query('DELETE FROM FORMULA_DETALLE WHERE FORMULA_DETALLE_ID = ?', [
            ingredientId,
        ]);
    }

    async saveList(newIngredientsList: NewIngredientsList): Promise<void> {
        const ingredientsToSave = this.newDBIngredientAdapter(newIngredientsList);

        await pool.query(
            'INSERT IGNORE INTO FORMULA_DETALLE (PRODUCTO_ID, INGREDIENTE_ID, TIPO_INGREDIENTE) VALUES ?',
            [ingredientsToSave],
        );
    }

    async getByProductId(productId: number): Promise<Ingredient[]> {
        const [result] = await pool.query<DBIngredient[]>(
            `
            SELECT F.* , I.NOMBRE AS 'INSUMO_NOMBRE', I.COSTO_UNITARIO AS 'INSUMO_COSTO', SP.COSTO_UNITARIO AS 'SUBPRODUCTO_COSTO', SP.NOMBRE AS 'SUBPRODUCTO_NOMBRE'
            FROM FORMULA_DETALLE F
            LEFT JOIN INSUMO I ON F.INGREDIENTE_ID = I.INSUMO_ID AND F.TIPO_INGREDIENTE = 'insumo'
            LEFT JOIN PRODUCTO SP ON F.INGREDIENTE_ID = SP.PRODUCTO_ID AND F.TIPO_INGREDIENTE = 'producto'
            WHERE F.PRODUCTO_ID = ?
            `,
            [productId],
        );

        return this.ingredientsListAdapter(result);
    }

    /**
     * Adapts a DBIngredient to an Ingredient.
     * @param incomingIngredient The DBIngredient to adapt.
     * @returns The adapted Ingredient.
     */
    private ingredientAdapter(incomingIngredient: DBIngredient): Ingredient {
        const isMaterialIngredient = incomingIngredient.TIPO_INGREDIENTE === 'insumo';

        return {
            id: incomingIngredient.FORMULA_DETALLE_ID,
            productId: incomingIngredient.PRODUCTO_ID,
            componentId: incomingIngredient.INGREDIENTE_ID,
            componentName: isMaterialIngredient
                ? incomingIngredient.INSUMO_NOMBRE!
                : incomingIngredient.SUBPRODUCTO_NOMBRE!,
            type: isMaterialIngredient ? IngredientType.Material : IngredientType.Product,
            unitPrice: isMaterialIngredient
                ? incomingIngredient.INSUMO_COSTO
                : incomingIngredient.SUBPRODUCTO_COSTO,
            amount: parseFloat(incomingIngredient.CANTIDAD),
        };
    }

    private ingredientsListAdapter(ingredientsList: DBIngredient[]) {
        return ingredientsList.map(this.ingredientAdapter);
    }

    /**
     * Adapts a NewIngredientsList to an array of NewDBIngredient.
     * @param newIngredientsList The NewIngredientsList to adapt.
     * @returns The adapted array of NewDBIngredient.
     */
    private newDBIngredientAdapter = (
        newIngredientsList: NewIngredientsList,
    ): NewDBIngredient[] => {
        const materialIngredients: NewDBIngredient[] = newIngredientsList.materialList.map(
            materialId => [newIngredientsList.productId, materialId, 'insumo'],
        );

        const subproductIngredients: NewDBIngredient[] = newIngredientsList.subproductList.map(
            subproductId => [newIngredientsList.productId, subproductId, 'producto'],
        );

        return [...materialIngredients, ...subproductIngredients];
    };
}

export default MySQLIngredientRepository;
