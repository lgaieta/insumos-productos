'use client';
import Ingredient from '@common/entities/Ingredient';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
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
        >
            {props.ingredients.map(ingredient => (
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
                >
                    {ingredient.componentName}
                </ListboxItem>
            ))}
        </Listbox>
    );
}

export default IngredientsListbox;
