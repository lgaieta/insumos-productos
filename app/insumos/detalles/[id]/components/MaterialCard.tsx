import { Card } from '@nextui-org/react';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type MaterialCardProps = {
    children: ReactNode;
    className?: string;
};

function MaterialCard(props: MaterialCardProps) {
    return <Card className={twMerge('w-full', props.className)}>{props.children}</Card>;
}

export default MaterialCard;
