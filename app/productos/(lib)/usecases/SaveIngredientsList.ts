import type IngredientRepository from '@common/entities/IngredientRepository';
import type NewIngredientsList from '@common/entities/NewIngredientsList';

class SaveIngredientsList {
    static async execute({
        newIngredientsList,
        ingredientRepository,
    }: {
        newIngredientsList: NewIngredientsList;
        ingredientRepository: IngredientRepository;
    }) {
        try {
            await ingredientRepository.saveList(newIngredientsList);

            return {
                success: true,
            };
        } catch (e) {
            console.error(e);

            return {
                success: false,
            };
        }
    }
}

export default SaveIngredientsList;
