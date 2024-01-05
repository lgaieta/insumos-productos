import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Button } from '@nextui-org/button';
import { Skeleton } from '@nextui-org/skeleton';

function Loading() {
    return (
        <div className='max-w-5xl w-full mt-10 mx-auto px-4 min-[400px]:px-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 grid-rows-none auto-rows-auto md:grid-rows-1 gap-6 mb-10'>
                <Skeleton className='rounded-xl'>
                    <div className='hidden md:flex w-full aspect-square md:aspect-auto h-full max-w-md'></div>
                </Skeleton>
                <Card className='sm:col-span-2'>
                    <CardHeader className='p-5 flex-wrap gap-4'>
                        <Skeleton className='rounded-full md:hidden'>
                            <div className='w-14 aspect-square'></div>
                        </Skeleton>
                        <Skeleton className='rounded-full'>
                            <h1 className='text-2xl font-bold'>Titulo de ejemplo</h1>
                        </Skeleton>
                    </CardHeader>
                    <Divider />
                    <CardBody className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                        <div className='flex flex-col w-full px-3 py-[10px] gap-2'>
                            <Skeleton className='rounded-full w-fit'>
                                <p className='font-bold h-[20px] leading-none'>N° Insumo</p>
                            </Skeleton>
                            <Skeleton className='rounded-full w-fit'>
                                <p>12031</p>
                            </Skeleton>
                        </div>
                        <div className='flex flex-col w-full px-3 py-[10px] gap-2'>
                            <Skeleton className='rounded-full w-fit'>
                                <p className='font-bold h-[20px] leading-none'>Nombre</p>
                            </Skeleton>
                            <Skeleton className='rounded-full w-fit'>
                                <p>Nombre de insumo</p>
                            </Skeleton>
                        </div>
                        <div className='flex flex-col w-full px-3 py-[10px] gap-2'>
                            <Skeleton className='rounded-full w-fit'>
                                <p className='font-bold h-[20px] leading-none'>Precio</p>
                            </Skeleton>
                            <Skeleton className='rounded-full w-fit'>
                                <p>1234812</p>
                            </Skeleton>
                        </div>
                        <div className='flex flex-col w-full px-3 py-[10px] gap-2'>
                            <Skeleton className='rounded-full w-fit'>
                                <p className='font-bold h-[20px] leading-none'>Link</p>
                            </Skeleton>
                            <Skeleton className='rounded-full w-fit'>
                                <p>Vacío</p>
                            </Skeleton>
                        </div>
                    </CardBody>
                    <Divider />
                    <CardFooter className='w-full gap-2 justify-end'>
                        <Skeleton className='rounded-xl'>
                            <Button>Editar</Button>
                        </Skeleton>
                        <Skeleton className='rounded-xl'>
                            <Button>Borrar</Button>
                        </Skeleton>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

export default Loading;
