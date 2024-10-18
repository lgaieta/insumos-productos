import type IngredientRepository from '@common/entities/IngredientRepository';
import type NewIngredientsList from '@common/entities/NewIngredientsList';
import type ProductRepository from '@common/entities/ProductRepository';
import UpdateSuperProductsPrice from '@productos/(lib)/usecases/UpdateSuperProductsPrice';

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
            const product = await productRepository.getById(newIngredientsList.productId);
            await new UpdateSuperProductsPrice().execute({
                product: product!,
                productRepository,
                ingredientRepository,
            });

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
