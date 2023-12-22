import Material from '@common/entities/Material';
import { CardBody, Button } from '@nextui-org/react';
import NextLink from 'next/link';

type MaterialCardBodyProps = {
    material: Material;
};

function MaterialCardBody(props: MaterialCardBodyProps) {
    const { material } = props;

    return (
        <CardBody className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div className='flex flex-col w-full px-3 py-[10px]'>
                <p className='font-bold h-[20px] leading-none'>N° Insumo</p>
                <p>{material.id.toString()}</p>
            </div>
            <div className='flex flex-col w-full px-3 py-[10px]'>
                <p className='font-bold h-[20px] leading-none'>Nombre</p>
                <p>{material.name}</p>
            </div>
            <div className='flex flex-col w-full px-3 py-[10px]'>
                <p className='font-bold h-[20px] leading-none'>Precio</p>
                <p>{material.price.toString()}</p>
            </div>
            {material.link ? (
                <Button
                    className='w-fit mx-3 my-[10px]'
                    as={NextLink}
                    href={material.link}
                    variant='ghost'
                    color='primary'
                >
                    Visitar link
                </Button>
            ) : (
                <div className='flex flex-col w-full px-3 py-[10px]'>
                    <p className='font-bold h-[20px] leading-none'>Link</p>
                    <p>Vacío</p>
                </div>
            )}
        </CardBody>
    );
}

export default MaterialCardBody;
