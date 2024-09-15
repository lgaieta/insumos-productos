import type NewIngredientsList from '@common/entities/NewIngredientsList';

interface IngredientRepository {
    saveList(newList: NewIngredientsList): Promise<void>;
}

export default IngredientRepository;
