import type Ingredient from '@common/entities/Ingredient';
import { Card, CardHeader, Button, Divider, CardBody } from '@nextui-org/react';
import SelectedIngredientsList from '@productos/(lib)/ui/components/dynamic-price-field/SelectedIngredientsList';

type SelectedIngredientsProps = {
    selectedIngredients: Ingredient[];
    onRemoveIngredient(ingredient: Ingredient): void;
    onAmountChange(ingredient: Ingredient, amount: number): void;
    onAddIngredientsClick(): void;
};

function SelectedIngredients(props: SelectedIngredientsProps) {
    return (
        <Card shadow='sm'>
            <CardHeader className='flex flex-col sm:flex-row gap-2 justify-between'>
                <h2 className='text-lg font-bold'>Ingredientes</h2>
                <Button
                    variant='flat'
                    onPress={props.onAddIngredientsClick}
                >
                    Añadir ingredientes
                </Button>
            </CardHeader>
            <Divider />
            <CardBody>
                {props.selectedIngredients.length < 1 && (
                    <p className='text-default-500'>
                        Haz click en &quot;Añadir ingredientes&quot; para agregar ingredientes a la
                        fórmula.
                    </p>
                )}
                <SelectedIngredientsList
                    ingredients={props.selectedIngredients}
                    onRemoveIngredient={props.onRemoveIngredient}
                    onAmountChange={props.onAmountChange}
                />
            </CardBody>
        </Card>
    );
}

export default SelectedIngredients;
