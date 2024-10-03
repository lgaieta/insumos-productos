import type Ingredient from '@common/entities/Ingredient';
import IngredientType from '@common/entities/IngredientType';
import IngredientsGridList from '@productos/detalles/[id]/components/ingredients-list/IngredientsGridList';
import IngredientsListOpenModalButton from '@productos/detalles/[id]/components/ingredients-list/IngredientsListOpenModalButton';
import SaveIngredientsButton from '@productos/detalles/[id]/components/ingredients-modal/SaveIngredientsButton';

const ingredients: Ingredient[] = [
    {
        id: 1,
        productId: 1,
        componentId: 1,
        componentName: 'Harina',
        type: IngredientType.Material,
        unitPrice: 10,
        amount: 2,
    },
    {
        id: 2,
        productId: 1,
        componentId: 2,
        componentName: 'Az car',
        type: IngredientType.Material,
        unitPrice: 15,
        amount: 1,
    },
    {
        id: 3,
        productId: 1,
        componentId: 3,
        componentName: 'Producto 1',
        type: IngredientType.Product,
        unitPrice: 20,
        amount: 3,
    },
];

function IngredientsSelector() {
    return (
        <div>
            <IngredientsListOpenModalButton />
            <IngredientsGridList ingredients={ingredients} />
        </div>
    );
}

export default IngredientsSelector;
