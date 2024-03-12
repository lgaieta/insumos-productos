'use client';
import { Listbox, ListboxItem } from '@nextui-org/listbox';

function IngredientsListbox() {
    return (
        <Listbox
            aria-label='Lista de Ingredientes'
            onAction={key => alert(key)}
            classNames={{ base: 'p-0' }}
            itemClasses={{
                base: 'px-4 py-3',
                title: 'text-base',
            }}
        >
            <ListboxItem
                key='new'
                description='Insumo'
            >
                Ejemplo 1 de insumo
            </ListboxItem>
            <ListboxItem
                key='new'
                description='Insumo'
            >
                Ejemplo 2 de insumo
            </ListboxItem>
            <ListboxItem
                key='new'
                description='Insumo'
            >
                Ejemplo 3 de insumo
            </ListboxItem>
            <ListboxItem
                key='new'
                description='Producto'
            >
                Ejemplo 1 de producto
            </ListboxItem>
            <ListboxItem
                key='new'
                description='Producto'
            >
                Ejemplo 2 de producto
            </ListboxItem>
        </Listbox>
    );
}

export default IngredientsListbox;
