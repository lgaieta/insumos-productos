import type Ingredient from '@common/entities/Ingredient';
import IngredientType from '@common/entities/IngredientType';
import type Material from '@common/entities/Material';
import type Product from '@common/entities/Product';

export const mergeProductsWithMaterials = (
    materials: Material[],
    products: Product[],
): Ingredient[] => {
    const materialIngredients = materials.map<Ingredient>(material => ({
        id: 1,
        productId: 1,
        componentId: material.id,
        componentName: material.name,
        type: IngredientType.Material,
        unitPrice: material.price,
        amount: 1,
    }));

    const productIngredients = products.map<Ingredient>(product => ({
        id: 1,
        productId: 1,
        componentId: product.id,
        componentName: product.name,
        type: IngredientType.Product,
        unitPrice: product.price,
        amount: 1,
    }));

    return [...materialIngredients, ...productIngredients];
};
