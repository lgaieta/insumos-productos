import type IngredientType from '@common/entities/IngredientType';
import Material from './Material';
import Product from './Product';

export type IngredientId = number;

type Ingredient<Type extends IngredientType = IngredientType> = {
    id: IngredientId;
    productId: Product['id'];
    componentId: Type extends 'material' ? Material['id'] : Product['id'];
    componentName: Type extends 'material' ? Material['name'] : Product['name'];
    type: Type;
    unitPrice: number;
    amount: number;
};

export default Ingredient;
