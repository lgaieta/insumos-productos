import Product from '@common/entities/Product';
import { CardBody, Button } from '@nextui-org/react';
import NextLink from 'next/link';

type ProductCardBodyProps = {
    product: Product;
};

function ProductCardBody(props: ProductCardBodyProps) {
    const { product } = props;

    return (
        <CardBody className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div className='flex flex-col w-full px-3 py-[10px]'>
                <p className='font-bold h-[20px] leading-none'>N° Producto</p>
                <p>{product.id.toString()}</p>
            </div>
            <div className='flex flex-col w-full px-3 py-[10px]'>
                <p className='font-bold h-[20px] leading-none'>Nombre</p>
                <p>{product.name}</p>
            </div>
            <div className='flex flex-col w-full px-3 py-[10px]'>
                <p className='font-bold h-[20px] leading-none'>Precio</p>
                <p>{product.price.toString()}</p>
            </div>
            {product.link ? (
                <Button
                    className='w-fit mx-3 my-[10px]'
                    as={NextLink}
                    href={product.link}
                    variant='ghost'
                    color='primary'
                >
                    Visitar link
                </Button>
            ) : (
                <div className='flex flex-col w-full px-3 py-[10px]'>
                    <p className='font-bold h-[20px] leading-none'>Link</p>
                    <p>Vacío</p>
                </div>
            )}
        </CardBody>
    );
}

export default ProductCardBody;
