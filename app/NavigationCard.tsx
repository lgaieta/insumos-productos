import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import NextImage from 'next/image';

type NavigationCardProps = {
    title: string;
    subtitle: string;
    imageProps: { src: string; alt: string; width: string; height: string };
};

function NavigationCard(props: NavigationCardProps) {
    return (
        <Card
            classNames={{
                base: 'mb-12 px-8 py-4 border border-transparent hover:border-foreground-300',
                header: 'flex flex-col gap-2',
            }}
            shadow='md'
            isPressable
        >
            <CardHeader>
                <h2 className='text-2xl font-bold w-full text-center text-foreground-800'>
                    {props.title}
                </h2>
                <p className='text-base text-foreground-400 w-full text-center'>
                    {props.subtitle}
                </p>
            </CardHeader>
            <CardBody>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                    as={NextImage}
                    {...props.imageProps}
                    classNames={{
                        wrapper: 'w-full aspect-[11 / 9]',
                        img: 'h-full w-full',
                    }}
                />
            </CardBody>
        </Card>
    );
}

export default NavigationCard;
