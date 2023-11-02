'use client';
import Material from '@/entities/Material';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
} from '@nextui-org/table';
import { Key } from 'react';
import { materialListAdapter } from '../adapters/materialAdapter';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import { getMaterialsFromDatabase } from '../services/getMaterialsFromDatabase';
import { useQuery } from '@tanstack/react-query';
import MaterialsTableBodySkeleton from './MaterialsTableBodySkeleton';
import { materialImageListAdapter } from '../adapters/materialImageAdapter';
import { getMaterialImagesFromDatabase } from '../services/getMaterialImagesFromDatabase';

const columns = [
    { key: 'image', label: 'Imagen' },
    {
        key: 'name',
        label: 'Nombre',
    },
    {
        key: 'price',
        label: 'Precio',
    },
    {
        key: 'link',
        label: 'Link',
    },
];

const getCellContent = (material: Material, columnKey: Key) => {
    const keyValue = getKeyValue(material, columnKey);

    if (columnKey === 'image')
        return (
            <Avatar
                src={keyValue}
                showFallback={keyValue === null}
            />
        );

    if (columnKey === 'link' && keyValue === null)
        return <Button variant='flat'>Agregar link</Button>;

    if (columnKey === 'link')
        return (
            <Link
                href={keyValue}
                as={NextLink}
            >
                {keyValue}
            </Link>
        );

    if (columnKey === 'price') return '$' + keyValue;

    return keyValue;
};

function MaterialsTable() {
    const { isPending, data: materials } = useQuery({
        queryKey: ['materials'],
        queryFn: async () => materialListAdapter(await getMaterialsFromDatabase()),
    });

    const { data: images } = useQuery({
        queryKey: ['materials', 'images'],
        queryFn: async () => materialImageListAdapter(await getMaterialImagesFromDatabase()),
    });

    return (
        <Table
            isStriped
            aria-label='Example table with dynamic content'
            classNames={{
                base: 'mt-6',
                loadingWrapper: 'relative table-cell',
            }}
        >
            <TableHeader columns={columns}>
                {column => (
                    <TableColumn
                        key={column.key}
                        width={column.key === 'image' ? '32' : null}
                    >
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                items={materials || undefined}
                isLoading={isPending}
                loadingContent={
                    <div className='flex w-full min-h-[450px]'>
                        <MaterialsTableBodySkeleton />
                    </div>
                }
            >
                {materials
                    ? material => (
                          <TableRow key={material.id}>
                              {columnKey => (
                                  <TableCell>{getCellContent(material, columnKey)}</TableCell>
                              )}
                          </TableRow>
                      )
                    : []}
            </TableBody>
        </Table>
    );
}

export default MaterialsTable;
