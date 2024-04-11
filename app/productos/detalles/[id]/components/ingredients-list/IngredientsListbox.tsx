'use client';
import Ingredient from '@common/entities/Ingredient';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import DeleteIngredientButton from '@productos/detalles/[id]/components/ingredients-list/DeleteIngredientButton';
import IngredientAmount from '@productos/detalles/[id]/components/ingredients-list/IngredientAmount';
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
                    onClick={e => {
                        e.stopPropagation();
                        router.push(
                            `/${
                                ingredient.type === 'material' ? 'insumos' : 'productos'
                            }/detalles/${ingredient.componentId}`,
                        );
                    }}
                    key={ingredient.id}
                    description={ingredient.type === 'material' ? 'Insumo' : 'Producto'}
                    endContent={
                        <div
                            className='flex gap-6'
                            onClick={e => e.stopPropagation()}
                        >
                            <IngredientAmount />
                            <DeleteIngredientButton ingredientId={ingredient.id} />
                        </div>
                    }
                >
                    {ingredient.componentName}
                </ListboxItem>
            )}
        </Listbox>
    );
}

export default IngredientsListbox;
