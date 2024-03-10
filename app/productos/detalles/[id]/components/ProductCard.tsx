import { Card } from '@nextui-org/react';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ProductCardProps = {
    children: ReactNode;
    className?: string;
};

function ProductCard(props: ProductCardProps) {
    return <Card className={twMerge('w-full', props.className)}>{props.children}</Card>;
}

export default ProductCard;
