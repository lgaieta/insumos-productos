import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import IngredientsListbox from './IngredientsListbox';
import Product from '@common/entities/Product';
import { getIngredientsFromDatabaseById } from '../../services/getIngredientsFromDatabaseById';
import { ingredientsListAdapter } from '../../adapters/ingredientAdapter';

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
            </CardHeader>
            <Divider />
            <CardBody>
                <IngredientsListbox ingredients={ingredients} />
            </CardBody>
        </Card>
    );
}

export default IngredientsList;
