'use client';
import Ingredient from '@common/entities/Ingredient';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { Button } from '@nextui-org/react';
import DeleteIngredientButton from '@productos/detalles/[id]/components/ingredients-list/DeleteIngredientButton';
import { useRouter } from 'next/navigation';

type IngredientsListboxProps = {
    ingredients: Ingredient[];
};

function IngredientsListbox(props: IngredientsListboxProps) {
    const router = useRouter();

    return (
        <Listbox
            aria-label='Lista de Ingredientes'
            classNames={{ base: 'p-0' }}
            itemClasses={{
                base: 'px-4 py-3',
                title: 'text-base',
            }}
            items={props.ingredients}
            variant='flat'
        >
            {ingredient => (
                <ListboxItem
                    onPress={() =>
                        router.push(
                            `/${
                                ingredient.type === 'material' ? 'insumos' : 'productos'
                            }/detalles/${ingredient.componentId}`,
                        )
                    }
                    key={ingredient.id}
                    description={ingredient.type === 'material' ? 'Insumo' : 'Producto'}
                    endContent={<DeleteIngredientButton ingredientId={ingredient.id} />}
                >
                    {ingredient.componentName}
                </ListboxItem>
            )}
        </Listbox>
    );
}

export default IngredientsListbox;
