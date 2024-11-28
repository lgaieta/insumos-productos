import Product from '@common/entities/Product';
import ProductPriceType from '@common/entities/ProductPriceType';
import { CardBody, Button } from '@nextui-org/react';
import NextLink from 'next/link';

type ProductCardBodyProps = {
    product: Product;
};

function ProductCardBody(props: ProductCardBodyProps) {
    const { product } = props;

    return (
        <CardBody className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            <div className='flex flex-col w-full px-3 py-[10px]'>
                <p className='font-bold h-[20px] leading-none'>N° Producto</p>
                <p>{product.id.toString()}</p>
            </div>
            <div className='flex flex-col w-full px-3 py-[10px]'>
                <p className='font-bold h-[20px] leading-none'>Nombre</p>
                <p>{product.name}</p>
            </div>
            <div className='flex flex-col w-full px-3 py-[10px]'>
                <p className='font-bold h-[20px] leading-none'>Tipo de precio</p>
                <p>{product.priceType === ProductPriceType.Dynamic ? 'Variable' : 'Fijo'}</p>
            </div>
            {product.priceType === ProductPriceType.Dynamic && (
                <>
                    <div className='flex flex-col w-full px-3 py-[10px]'>
                        <p className='font-bold h-[20px] leading-none'>Precio inicial</p>
                        <p>${(product.price / (1 + product.profit / 100)).toString()}</p>
                    </div>
                    <div className='flex flex-col w-full px-3 py-[10px]'>
                        <p className='font-bold h-[20px] leading-none'>Ganancia</p>
                        <p>{product.profit.toString()}%</p>
                    </div>
                </>
            )}
            <div className='flex flex-col w-full px-3 py-[10px]'>
                <p className='font-bold h-[20px] leading-none'>Precio total</p>
                <p>${product.price.toString()}</p>
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
