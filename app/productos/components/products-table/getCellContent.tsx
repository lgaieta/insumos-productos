import Product from '@/(common)/entities/Product';
import { getKeyValue } from '@nextui-org/table';
import { Key } from 'react';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import NextLink from 'next/link';
import { MdCameraAlt } from 'react-icons/md';
import AddLinkButton from './AddLinkButton';

export const getCellContent = (product: Product, columnKey: Key) => {
    const keyValue = getKeyValue(product, columnKey);

    if (columnKey === 'image')
        return (
            <Avatar
                src={keyValue}
                showFallback={keyValue === null}
                fallback={
                    <MdCameraAlt
                        size={24}
                        color='#3F3F46'
                    />
                }
            />
        );

    if (columnKey === 'link' && keyValue === null) return <AddLinkButton productId={product.id} />;

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

    if (columnKey === 'name') return <div className='min-w-[150px]'>{keyValue}</div>;

    return keyValue;
};
