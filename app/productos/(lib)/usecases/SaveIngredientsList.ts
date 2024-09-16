import type IngredientRepository from '@common/entities/IngredientRepository';
import type NewIngredientsList from '@common/entities/NewIngredientsList';
import type ProductRepository from '@common/entities/ProductRepository';

class SaveIngredientsList {
    static async execute({
        newIngredientsList,
        ingredientRepository,
        productRepository,
    }: {
        newIngredientsList: NewIngredientsList;
        ingredientRepository: IngredientRepository;
        productRepository: ProductRepository;
    }) {
        try {
            await ingredientRepository.saveList(newIngredientsList);
            await productRepository.recalculatePriceRecursively(newIngredientsList.productId);

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
