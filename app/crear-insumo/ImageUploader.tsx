import { Card, CardBody } from '@nextui-org/card';
import Image from 'next/image';

function ImageUploader() {
    return (
        <div className='flex flex-col gap-2'>
            <p className='text-sm font-bold'>Imagen</p>
            <Card
                shadow='none'
                classNames={{
                    base: 'border-2 border-dashed border-divider transition-colors hover:bg-default-50',
                    body: 'flex-col items-center gap-1 py-8',
                }}
            >
                <CardBody>
                    <Image
                        src='/file-icon.svg'
                        alt='Icono de imagen'
                        width={24}
                        height={24}
                    />
                    <p className='text-foreground-500'>
                        Arrastre su imagen o haga click aquí
                    </p>
                </CardBody>
            </Card>
        </div>
    );
}

export default ImageUploader;
