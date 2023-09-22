import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';
import NextImage from 'next/image';
import { DragEventHandler, useRef, useState } from 'react';

type ImageUploaderProps = {
    isError: boolean;
    errorMessage: string | null;
};

function ImageUploader(props: ImageUploaderProps) {
    const { isError, errorMessage } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isSelected, setIsSelected] = useState(false);
    const [isDragActive, setIsDragActive] = useState(false);

    const handleInputChange = () => {
        if (inputRef.current === null || !inputRef.current.files) return;

        if (inputRef.current.files.length > 0) {
            setIsSelected(true);
        } else {
            setIsSelected(false);
        }
    };

    const handleDrag: DragEventHandler<HTMLElement> = event => {
        event.preventDefault();
        event.stopPropagation();

        if (event.type === 'dragenter' || event.type === 'dragover') {
            setIsDragActive(true);
        } else if (event.type === 'dragleave') {
            setIsDragActive(false);
        }
    };

    const handleFileDrop: DragEventHandler<HTMLDivElement> = event => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(false);

        const file = event.dataTransfer?.files[0];

        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            const list = new DataTransfer();
            list.items.add(file);
            if (inputRef.current) inputRef.current.files = list.files;
            setIsSelected(true);
        }
    };

    const handleRemoveImageClick = () => {
        if (inputRef.current === null || !inputRef.current.files) return;

        inputRef.current.value = '';
        setIsSelected(false);
    };

    const getSelectedImageURL = (file: File) => URL.createObjectURL(file);

    return (
        <div
            className={`flex flex-col gap-2 select-none ${
                isError ? 'text-danger' : ''
            }`}
        >
            <p className='text-sm font-bold'>Imagen</p>
            <input
                type='file'
                name='image'
                id='imageInput'
                className='hidden'
                accept='image/png, image/jpeg'
                ref={inputRef}
                onChange={handleInputChange}
            />
            {!isSelected ? (
                <label
                    htmlFor='imageInput'
                    className='relative'
                    onDragEnter={handleDrag}
                >
                    <Card
                        shadow='none'
                        classNames={{
                            base: 'relative border-2 border-dashed border-divider transition-colors hover:bg-default-50',
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
                    {isDragActive && (
                        <div
                            className='absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-0'
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleFileDrop}
                        ></div>
                    )}
                </label>
            ) : (
                <Card
                    shadow='none'
                    classNames={{
                        base: `border-1 ${
                            isError ? 'border-danger' : 'border-divider'
                        }`,
                        body: 'flex-col items-center gap-4',
                    }}
                >
                    <CardBody>
                        <Image
                            as={NextImage}
                            src={
                                inputRef.current?.files
                                    ? getSelectedImageURL(
                                          inputRef.current.files[0],
                                      )
                                    : ''
                            }
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
                            onClick={handleRemoveImageClick}
                        >
                            Seleccionar otra imagen
                        </Button>
                    </CardBody>
                </Card>
            )}
            {isError ? (
                <p className='text-sm text-danger'>{errorMessage}</p>
            ) : null}
        </div>
    );
}

export default ImageUploader;
