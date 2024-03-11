'use client';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Button } from '@nextui-org/button';
import { Listbox, ListboxItem } from '@nextui-org/listbox';

function IngredientsList() {
    return (
        <Card classNames={{ header: 'justify-between p-5', body: 'p-5' }}>
            <CardHeader>
                <h2 className='text-xl font-bold'>Ingredientes</h2>
            </CardHeader>
            <Divider />
            <CardBody>
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
            </CardBody>
        </Card>
    );
}

export default IngredientsList;
