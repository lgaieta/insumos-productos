import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { ReactNode } from 'react';

type NavigationCardProps = {
    title: string;
    subtitle: string;
    bodyContent: ReactNode;
};

function NavigationCard(props: NavigationCardProps) {
    return (
        <Card
            classNames={{
                base: 'p-4 aspect-square border border-transparent lg:max-h-[50vh] transition-colors hover:border-primary-400',
                header: 'flex flex-col gap-2',
                body: 'justify-end p-0 md:py-4',
            }}
            shadow='md'
            isPressable
            fullWidth
        >
            <CardHeader>
                <h2 className='text-2xl font-bold w-full text-center text-foreground-800'>
                    {props.title}
                </h2>
                <p className='text-base text-foreground-400 w-full text-center'>{props.subtitle}</p>
            </CardHeader>
            <CardBody>{props.bodyContent}</CardBody>
        </Card>
    );
}

export default NavigationCard;
