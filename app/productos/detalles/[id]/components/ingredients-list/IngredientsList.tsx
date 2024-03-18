import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import Product from '@common/entities/Product';
import { ingredientsListAdapter } from '@productos/adapters/ingredientAdapter';
import IngredientsListbox from '@productos/detalles/[id]/components/ingredients-list/IngredientsListbox';
import IngredientsModalWithButton from '@productos/detalles/[id]/components/ingredients-modal/IngredientsModalWithButton';
import { getIngredientsFromDatabaseById } from '@productos/services/getIngredientsFromDatabaseById';

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
                <IngredientsModalWithButton />
            </CardHeader>
            <Divider />
            <CardBody>
                {ingredients.length > 0 ? (
                    <IngredientsListbox ingredients={ingredients} />
                ) : (
                    <p className='text-foreground-500'>No se encontraron ingredientes.</p>
                )}
            </CardBody>
        </Card>
    );
}

export default IngredientsList;
