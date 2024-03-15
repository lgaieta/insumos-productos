import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Button } from '@nextui-org/button';
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
                <Button variant='flat'>Añadir ingrediente</Button>
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
