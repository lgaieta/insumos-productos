import Material from '@/(common)/entities/Material';
import { getKeyValue } from '@nextui-org/table';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import NextLink from 'next/link';
import { MdCameraAlt } from 'react-icons/md';
import AddLinkButton from '@insumos/(lib)/ui/components/materials-table/AddLinkButton';

export const getCellContent = (material: Material, columnKey: string | number) => {
    const keyValue = getKeyValue(material, columnKey);

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

    if (columnKey === 'link' && keyValue === null) return <AddLinkButton material={material} />;

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
