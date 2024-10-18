'use client';
import Ingredient from '@common/entities/Ingredient';
import DeleteIngredientButton from '@productos/(lib)/ui/components/ingredients-list/DeleteIngredientButton';
import IngredientAmount from '@productos/(lib)/ui/components/ingredients-list/IngredientAmount';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/react';
import { Key } from 'react';
import Link from 'next/link';

type IngredientsGridListProps = {
    ingredients: Ingredient[];
    renderCell?: (ingredient: Ingredient, columnKey: Key) => JSX.Element;
};

const columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'amount', label: 'Cantidad' },
    { key: 'actions', label: 'Acciones' },
];

const renderCell = (ingredient: Ingredient, columnKey: Key) => {
    if (columnKey === 'name')
        return (
            <Link
                href={`/${ingredient.type === 'material' ? 'insumos' : 'productos'}/detalles/${
                    ingredient.componentId
                }`}
                className='flex flex-col justify-center items-start min-w-[200px]'
            >
                <p className='text-small'>{ingredient.componentName}</p>
                <p className='text-tiny text-foreground-400'>
                    {ingredient.type === 'material' ? 'Insumo' : 'Producto'}
                </p>
            </Link>
        );
    if (columnKey === 'amount')
        return (
            <IngredientAmount
                ingredientId={ingredient.id}
                defaultValue={ingredient.amount}
            />
        );
    if (columnKey === 'actions') return <DeleteIngredientButton ingredientId={ingredient.id} />;
};

function IngredientsGridList(props: IngredientsGridListProps) {
    return (
        <Table
            aria-label='Tabla de ingredientes pertenecientes al producto'
            removeWrapper
            isStriped
        >
            <TableHeader columns={columns}>
                {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={props.ingredients}>
                {ingredient => (
                    <TableRow key={ingredient.id}>
                        {columnKey => (
                            <TableCell>
                                {props.renderCell
                                    ? props.renderCell(ingredient, columnKey)
                                    : renderCell(ingredient, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default IngredientsGridList;
