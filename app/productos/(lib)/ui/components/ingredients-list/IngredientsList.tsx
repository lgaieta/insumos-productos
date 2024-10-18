import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import Product from '@common/entities/Product';
import IngredientsGridList from '@productos/(lib)/ui/components/ingredients-list/IngredientsGridList';
import IngredientsListOpenModalButton from '@productos/(lib)/ui/components/ingredients-list/IngredientsListOpenModalButton';
import MySQLIngredientRepository from '@productos/(lib)/services/MySQLIngredientRepository';
type IngredientsListProps = {
    productId: Product['id'];
};

async function IngredientsList(props: IngredientsListProps) {
    const ingredientRepository = new MySQLIngredientRepository();
    const ingredients = await ingredientRepository.getByProductId(props.productId);

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
