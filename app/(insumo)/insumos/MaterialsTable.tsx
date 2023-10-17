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
import { Key, useEffect, useState } from 'react';
import { materialListAdapter } from './materialAdapter';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/react';
import { materialImageListAdapter } from './materialImageAdapter';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';

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
    const [materials, setMaterials] = useState<Material[] | null>(null);

    useEffect(() => {
        fetch('/insumos/db')
            .then(res => res.json())
            .then(data => materialListAdapter(data))
            .then(adaptedData => setMaterials(adaptedData));

        fetch('/insumos/db/imagenes')
            .then(res => res.json())
            .then(data => materialImageListAdapter(data))
            .then(adaptedData => {
                if (Object.keys(adaptedData).length === 0) return;

                setMaterials(previous =>
                    previous
                        ? previous.map(material => ({
                              ...material,
                              image: (adaptedData as { [id: number]: string })[material.id]
                                  ? (adaptedData as { [id: number]: string })[material.id]
                                  : null,
                          }))
                        : null,
                );
            });
    }, []);

    return (
        <Table
            isStriped
            aria-label='Example table with dynamic content'
            classNames={{ base: 'mt-6' }}
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
            <TableBody items={materials || undefined}>
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
