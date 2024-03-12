import Material from './Material';
import Product from './Product';

export type IngredientType = 'material' | 'product';

type Ingredient<Type extends IngredientType> = {
    id: number;
    productId: Product['id'];
    componentId: Type extends 'material' ? Material['id'] : Product['id'];
    type: Type;
    amount: number;
};

export default Ingredient;
