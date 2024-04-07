import { NewIngredientList } from '@productos/actions/saveIngredientListServerAction';
import { NewDBIngredient } from '@productos/services/saveIngredientListInDatabase';

export const saveIngredientListAdapter = (list: NewIngredientList): NewDBIngredient[] => {
    const materialIngredients: [number, number, null][] = list.materialList.map(materialId => [
        list.productId,
        materialId,
        null,
    ]);

    const subproductIngredients: [number, null, number][] = list.subproductList.map(
        subproductId => [list.productId, null, subproductId],
    );

    return [...materialIngredients, ...subproductIngredients];
};
