import type Ingredient from '@common/entities/Ingredient';

export const removeDuplicatedIngredients = (ingredients: Ingredient[]) => {
    return ingredients.reduce((acc: Ingredient[], ingredient: Ingredient) => {
        const foundIngredient = acc.some(
            i => i.componentId === ingredient.componentId && i.type === ingredient.type,
        );
        if (foundIngredient) return acc;
        else return [...acc, ingredient];
    }, []);
};
