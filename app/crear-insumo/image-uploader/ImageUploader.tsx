import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';
import NextImage from 'next/image';
import { useState } from 'react';

function ImageUploader() {
    const [isSelected, setIsSelected] = useState(false);

    const toggleSelected = () => setIsSelected(prev => !prev);

    if (!isSelected)
        return (
            <div
                className='flex flex-col gap-2  select-none'
                onClick={toggleSelected}
            >
                <p className='text-sm font-bold'>Imagen</p>
                <Card
                    shadow='none'
                    classNames={{
                        base: 'border-2 border-dashed border-divider transition-colors hover:bg-default-50',
                        body: 'flex-col items-center gap-1 py-8',
                    }}
                >
                    <CardBody>
                        <NextImage
                            src='/file-icon.svg'
                            alt='Icono de imagen'
                            width={32}
                            height={32}
                        />
                        <p className='text-foreground-500'>
                            Arrastre su imagen o haga click aquí
                        </p>
                    </CardBody>
                </Card>
            </div>
        );
    else
        return (
            <div
                className='flex flex-col gap-2 select-none'
                onClick={toggleSelected}
            >
                <p className='text-sm font-bold'>Imagen</p>
                <Card
                    shadow='none'
                    classNames={{
                        base: 'border-1 border-divider',
                        body: 'flex-col items-center gap-4',
                    }}
                >
                    <CardBody>
                        <Image
                            as={NextImage}
                            src='/cup-image.png'
                            alt='Icono de imagen'
                            width={52}
                            height={52}
                            shadow='md'
                            radius='sm'
                            className='w-[120px] aspect-square'
                        />
                        <Button
                            variant='flat'
                            className='w-full'
                        >
                            Seleccionar otra imagen
                        </Button>
                    </CardBody>
                </Card>
            </div>
        );
}

export default ImageUploader;
