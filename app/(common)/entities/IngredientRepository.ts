import type { IngredientId } from '@common/entities/Ingredient';
import type Ingredient from '@common/entities/Ingredient';
import type IngredientType from '@common/entities/IngredientType';
import type NewIngredientsList from '@common/entities/NewIngredientsList';

interface IngredientRepository {
    saveList(newList: NewIngredientsList): Promise<void>;
    getByProductId(productId: number): Promise<Ingredient[]>;
    getByComponentId(componentId: number): Promise<Ingredient[]>;
    getById(ingredientId: IngredientId): Promise<Ingredient | null>;
    updateAmount(ingredientId: number, amount: number): Promise<void>;
    deleteByProductId(productId: number): Promise<void>;
    deleteByComponentId(componentId: number, componentType: IngredientType): Promise<void>;
    deleteById(ingredientId: IngredientId): Promise<void>;
}

export default IngredientRepository;
