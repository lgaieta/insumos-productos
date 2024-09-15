import type IngredientType from '@common/entities/IngredientType';
import Material from './Material';
import Product from './Product';

type Ingredient<Type extends IngredientType = IngredientType> = {
    id: number;
    productId: Product['id'];
    componentId: Type extends 'material' ? Material['id'] : Product['id'];
    componentName: Type extends 'material' ? Material['name'] : Product['name'];
    type: Type;
    unit_price: number;
    amount: number;
};

export default Ingredient;
