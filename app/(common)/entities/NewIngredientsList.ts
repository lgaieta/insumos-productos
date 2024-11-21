import type Ingredient from '@common/entities/Ingredient';
import type IngredientType from '@common/entities/IngredientType';

type NewIngredientsList = {
    productId: Ingredient['productId'];
    materialList: [Ingredient<IngredientType.Material>['componentId'], number][];
    subproductList: [Ingredient<IngredientType.Product>['componentId'], number][];
};
export default NewIngredientsList;
