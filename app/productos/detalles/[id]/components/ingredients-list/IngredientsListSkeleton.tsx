import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Skeleton } from '@nextui-org/skeleton';

function IngredientsListSkeleton() {
    return (
        <Card classNames={{ header: 'justify-between p-5', body: 'p-5' }}>
            <CardHeader>
                <h2 className='text-xl font-bold'>Ingredientes</h2>
            </CardHeader>
            <Divider />
            <CardBody>
                <ul className='flex flex-col'>
                    <li className='flex flex-col gap-3 w-full items-start justify-center px-4 py-3'>
                        <Skeleton className='rounded-full'>
                            <p className='text-base leading-none'>Impresion color</p>
                        </Skeleton>
                        <Skeleton className='rounded-full'>
                            <p className='text-tiny leading-none'>Insumo</p>
                        </Skeleton>
                    </li>
                    <li className='flex flex-col gap-3 w-full items-start justify-center px-4 py-3'>
                        <Skeleton className='rounded-full'>
                            <p className='text-base leading-none'>Impresion color</p>
                        </Skeleton>
                        <Skeleton className='rounded-full'>
                            <p className='text-tiny leading-none'>Insumo</p>
                        </Skeleton>
                    </li>
                    <li className='flex flex-col gap-3 w-full items-start justify-center px-4 py-3'>
                        <Skeleton className='rounded-full'>
                            <p className='text-base leading-none'>Impresion color</p>
                        </Skeleton>
                        <Skeleton className='rounded-full'>
                            <p className='text-tiny leading-none'>Insumo</p>
                        </Skeleton>
                    </li>
                    <li className='flex flex-col gap-3 w-full items-start justify-center px-4 py-3'>
                        <Skeleton className='rounded-full'>
                            <p className='text-base leading-none'>Impresion color</p>
                        </Skeleton>
                        <Skeleton className='rounded-full'>
                            <p className='text-tiny leading-none'>Insumo</p>
                        </Skeleton>
                    </li>
                </ul>
            </CardBody>
        </Card>
    );
}

export default IngredientsListSkeleton;
