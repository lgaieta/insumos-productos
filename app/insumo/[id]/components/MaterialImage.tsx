import { Card, CardBody } from '@nextui-org/card';
import { ChangeEventHandler, MutableRefObject, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import NextImage from 'next/image';

type MaterialImageProps = {
    isEditable: boolean;
    imageSrc: string | null;
    imageAlt: string;
};

function MaterialImage(props: MaterialImageProps) {
    const { imageSrc, imageAlt, isEditable } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);

    const getNewImage = (inputElement: HTMLInputElement) =>
        URL.createObjectURL(inputElement.files![0]);
    const [newImage, setNewImage] = useState<string | null>(null);

    const src =
        newImage !== null && isEditable && inputRef.current !== null
            ? getNewImage(inputRef.current)
            : imageSrc || '';

    return (
        <div className='hidden md:flex relative w-full h-full'>
            <Card className='w-full aspect-square md:aspect-auto h-full max-w-md'>
                <CardBody className='relative block p-0 w-full h-full'>
                    <NextImage
                        priority
                        src={src}
                        alt={imageAlt}
                        className='object-cover'
                        fill
                    />
                </CardBody>
            </Card>
            {isEditable ? (
                <ImageOverlay
                    inputRef={inputRef}
                    onChange={({ target: { files } }) =>
                        setNewImage(files !== null && files[0]?.size > 0 ? files[0].name : null)
                    }
                />
            ) : null}
        </div>
    );
}

export default MaterialImage;

function ImageOverlay(props: {
    onChange: ChangeEventHandler<HTMLInputElement>;
    inputRef: MutableRefObject<HTMLInputElement | null>;
}) {
    return (
        <>
            <label
                htmlFor='imageInput'
                className='absolute focus:border-primary border-2 border-transparent rounded-xl flex items-center justify-center cursor-pointer w-full h-full top-0 left-0 z-10 bg-foreground/60'
            >
                <MdEdit
                    className='h-10 w-10'
                    color='#FFFFFF'
                />
            </label>
            <input
                type='file'
                name='image'
                id='imageInput'
                className='hidden'
                aria-hidden
                accept='image/png, image/jpeg'
                ref={props.inputRef}
                onChange={props.onChange}
            />
        </>
    );
}
