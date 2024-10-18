import { CardBody } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import Product from '@common/entities/Product';
import { useState } from 'react';

type ProductCardEditableBodyProps = {
    product: Product;
};

function ProductCardEditableBody(props: ProductCardEditableBodyProps) {
    const { product } = props;

    const initialPrice = (product.price / (1 + product.profit / 100))

    const [price, setPrice] = useState(product.price);
    const [profit, setProfit] = useState(product.profit);

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPrice = Number(event.target.value)
        setPrice(newPrice);
        const newProfit = 100 * (newPrice / initialPrice - 1);
        setProfit(newProfit);
    };

    const handleProfitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfit(Number(event.target.value));
        const newPrice = initialPrice * (1 + Number(event.target.value) / 100);
        setPrice(newPrice);
    };

    return (
        <CardBody className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div className='flex flex-col w-full px-3 py-[10px]'>
                <p className='font-bold h-[20px] leading-none'>N° Productos</p>
                <p>{product.id.toString()}</p>
            </div>
            <Input
                label='Nombre'
                name='name'
                defaultValue={product.name}
                classNames={{
                    label: '!text-base !font-bold text-foreground',
                }}
                size='lg'
                isClearable
                isRequired
                autoFocus
            />
            <Input
                label='Precio inicial'
                name='initial_price'
                defaultValue={initialPrice.toString()}
                classNames={{
                    label: '!text-base !font-bold text-foreground',
                }}
                isDisabled
                disabled
                size='lg'
                startContent={<div className='pointer-events-none flex items-center'>$</div>}
            />
            <Input
                label='Ganancia'
                name='profit'
                value={profit.toString()}
                onChange={handleProfitChange}
                classNames={{
                    label: '!text-base !font-bold text-foreground',
                }}
                size='lg'
                isClearable
                isRequired
                startContent={<div className='pointer-events-none flex items-center'>%</div>}
            />
            <Input
                label='Precio'
                name='price'
                value={price.toString()}
                onChange={handlePriceChange}
                classNames={{
                    label: '!text-base !font-bold text-foreground',
                }}
                size='lg'
                isClearable
                isRequired
                startContent={<div className='pointer-events-none flex items-center'>$</div>}
            />
            <Input
                label='Link'
                name='link'
                defaultValue={product.link || undefined}
                classNames={{
                    label: '!text-base !font-bold text-foreground',
                }}
                size='lg'
                isClearable
                placeholder='Copie el link del producto y péguelo aquí'
            />
        </CardBody>
    );
}

export default ProductCardEditableBody;
