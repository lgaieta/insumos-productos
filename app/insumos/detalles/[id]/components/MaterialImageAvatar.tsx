import { Avatar } from '@nextui-org/avatar';
import { ChangeEventHandler, MutableRefObject, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { MdCameraAlt } from 'react-icons/md';

type MaterialImageProps = {
    isEditable: boolean;
    imageSrc: string | null;
    classNames?: { imageContainer: string };
};

function ImageOverlay(props: {
    onChange: ChangeEventHandler<HTMLInputElement>;
    inputRef: MutableRefObject<HTMLInputElement | null>;
}) {
    return (
        <>
            <label
                htmlFor='imageInput'
                className='absolute focus:border-primary border-2 border-transparent flex items-center justify-center cursor-pointer rounded-full w-14 h-14 top-0 left-0 z-10 bg-foreground/60'
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

function MaterialImageAvatar(props: MaterialImageProps) {
    const { imageSrc, isEditable } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);

    const getNewImage = (inputElement: HTMLInputElement) =>
        URL.createObjectURL(inputElement.files![0]);
    const [newImage, setNewImage] = useState<string | null>(null);

    const src =
        newImage !== null && isEditable && inputRef.current !== null
            ? getNewImage(inputRef.current)
            : imageSrc || undefined;

    return (
        <div className={twMerge('relative block', props.classNames?.imageContainer)}>
            <Avatar
                size='lg'
                src={src}
                showFallback={imageSrc === null && newImage === null}
                fallback={
                    <MdCameraAlt
                        size={32}
                        color='#3F3F46'
                    />
                }
            />
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

export default MaterialImageAvatar;
