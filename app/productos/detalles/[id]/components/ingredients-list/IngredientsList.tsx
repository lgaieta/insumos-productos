import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import Product from '@common/entities/Product';
import { ingredientsListAdapter } from '@productos/(lib)/adapters/ingredientAdapter';
import IngredientsGridList from '@productos/detalles/[id]/components/ingredients-list/IngredientsGridList';
import { getIngredientsFromDatabaseById } from '@productos/(lib)/services/getIngredientsFromDatabaseById';
import IngredientsListOpenModalButton from '@productos/detalles/[id]/components/ingredients-list/IngredientsListOpenModalButton';
type IngredientsListProps = {
    productId: Product['id'];
};

async function IngredientsList(props: IngredientsListProps) {
    const ingredients = ingredientsListAdapter(
        await getIngredientsFromDatabaseById(props.productId),
    );

    return (
        <Card classNames={{ header: 'justify-between p-5', body: 'p-5' }}>
            <CardHeader>
                <h2 className='text-xl font-bold'>Ingredientes</h2>
                <IngredientsListOpenModalButton />
            </CardHeader>
            <Divider />
            <CardBody>
                {ingredients.length > 0 ? (
                    <IngredientsGridList ingredients={ingredients} />
                ) : (
                    <p className='text-foreground-500'>No se encontraron ingredientes.</p>
                )}
            </CardBody>
        </Card>
    );
}

export default IngredientsList;
