import { CardHeader } from '@nextui-org/card';
import ProductImageAvatar from './ProductImageAvatar';

type ProductCardHeaderProps = {
    isEditable: boolean;
    imageSrc: string | null;
    title: string;
    classNames?: { imageContainer: string };
};

function ProductCardHeader(props: ProductCardHeaderProps) {
    return (
        <CardHeader className='p-5 flex-wrap gap-4'>
            <ProductImageAvatar
                isEditable={props.isEditable}
                imageSrc={props.imageSrc}
                classNames={props.classNames}
            />
            <h1 className='text-2xl font-bold'>{props.title}</h1>
        </CardHeader>
    );
}

export default ProductCardHeader;
