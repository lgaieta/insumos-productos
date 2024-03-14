import Material from './Material';
import Product from './Product';

export type IngredientType = 'material' | 'product';

type Ingredient<Type extends IngredientType = IngredientType> = {
    id: number;
    productId: Product['id'];
    componentId: Type extends 'material' ? Material['id'] : Product['id'];
    componentName: Type extends 'material' ? Material['name'] : Product['name'];
    type: Type;
    amount: number;
};

export default Ingredient;
