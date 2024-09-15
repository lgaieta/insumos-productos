import { NewIngredientList } from '@productos/(lib)/actions/saveIngredientListServerAction';
import { NewDBIngredient } from '@productos/(lib)/services/saveIngredientListInDatabase';

export const saveIngredientListAdapter = (list: NewIngredientList): NewDBIngredient[] => {
    const materialIngredients: [number, number, string][] = list.materialList.map(materialId => [
        list.productId,
        materialId,
        'insumo',
    ]);

    const subproductIngredients: [number, number, string][] = list.subproductList.map(
        subproductId => [list.productId, subproductId, 'producto'],
    );

    return [...materialIngredients, ...subproductIngredients];
};