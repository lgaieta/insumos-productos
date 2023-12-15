import Material from '@/(common)/entities/Material';
import { getKeyValue } from '@nextui-org/table';
import { Key } from 'react';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';

export const getCellContent = (material: Material, columnKey: Key) => {
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
            <Button
                className='w-fit'
                as={NextLink}
                href={keyValue}
                variant='ghost'
                color='primary'
            >
                Visitar link
            </Button>
        );

    if (columnKey === 'price') return '$' + keyValue;

    return keyValue;
};
