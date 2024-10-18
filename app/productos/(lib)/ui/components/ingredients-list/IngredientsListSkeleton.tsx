'use client';

import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/table';
import { Button } from '@nextui-org/button';
import { Skeleton } from '@nextui-org/skeleton';

function IngredientsListSkeleton() {
    return (
        <Card classNames={{ header: 'justify-between p-5', body: 'p-5' }}>
            <CardHeader>
                <h2 className='text-xl font-bold'>Ingredientes</h2>
                <Skeleton className='rounded-xl'>
                    <Button>Añadir ingrediente</Button>
                </Skeleton>
            </CardHeader>
            <Divider />
            <CardBody>
                <Table
                    aria-label='Tabla de ingredientes pertenecientes al producto'
                    removeWrapper
                    isStriped
                >
                    <TableHeader>
                        <TableColumn>
                            <Skeleton className='rounded-full'>Nombre</Skeleton>
                        </TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <div className='flex flex-col justify-center gap-2 items-start min-w-[200px]'>
                                    <Skeleton className='rounded-full'>
                                        <p className='text-small !leading-[16px]'>
                                            Nombre de insumo largo
                                        </p>
                                    </Skeleton>
                                    <Skeleton className='rounded-full'>
                                        <p className='text-tiny text-foreground-400 !leading-none'>
                                            Insumo
                                        </p>
                                    </Skeleton>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className='flex flex-col justify-center gap-2 items-start min-w-[200px]'>
                                    <Skeleton className='rounded-full'>
                                        <p className='text-small !leading-[16px]'>
                                            Nombre de insumo largo
                                        </p>
                                    </Skeleton>
                                    <Skeleton className='rounded-full'>
                                        <p className='text-tiny text-foreground-400 !leading-none'>
                                            Insumo
                                        </p>
                                    </Skeleton>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className='flex flex-col justify-center gap-2 items-start min-w-[200px]'>
                                    <Skeleton className='rounded-full'>
                                        <p className='text-small !leading-[16px]'>
                                            Nombre de insumo largo
                                        </p>
                                    </Skeleton>
                                    <Skeleton className='rounded-full'>
                                        <p className='text-tiny text-foreground-400 !leading-none'>
                                            Insumo
                                        </p>
                                    </Skeleton>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className='flex flex-col justify-center gap-2 items-start min-w-[200px]'>
                                    <Skeleton className='rounded-full'>
                                        <p className='text-small !leading-[16px]'>
                                            Nombre de insumo largo
                                        </p>
                                    </Skeleton>
                                    <Skeleton className='rounded-full'>
                                        <p className='text-tiny text-foreground-400 !leading-none'>
                                            Insumo
                                        </p>
                                    </Skeleton>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className='flex flex-col justify-center gap-2 items-start min-w-[200px]'>
                                    <Skeleton className='rounded-full'>
                                        <p className='text-small !leading-[16px]'>
                                            Nombre de insumo largo
                                        </p>
                                    </Skeleton>
                                    <Skeleton className='rounded-full'>
                                        <p className='text-tiny text-foreground-400 !leading-none'>
                                            Insumo
                                        </p>
                                    </Skeleton>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className='flex flex-col justify-center gap-2 items-start min-w-[200px]'>
                                    <Skeleton className='rounded-full'>
                                        <p className='text-small !leading-[16px]'>
                                            Nombre de insumo largo
                                        </p>
                                    </Skeleton>
                                    <Skeleton className='rounded-full'>
                                        <p className='text-tiny text-foreground-400 !leading-none'>
                                            Insumo
                                        </p>
                                    </Skeleton>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className='flex flex-col justify-center gap-2 items-start min-w-[200px]'>
                                    <Skeleton className='rounded-full'>
                                        <p className='text-small !leading-[16px]'>
                                            Nombre de insumo largo
                                        </p>
                                    </Skeleton>
                                    <Skeleton className='rounded-full'>
                                        <p className='text-tiny text-foreground-400 !leading-none'>
                                            Insumo
                                        </p>
                                    </Skeleton>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className='flex flex-col justify-center gap-2 items-start min-w-[200px]'>
                                    <Skeleton className='rounded-full'>
                                        <p className='text-small !leading-[16px]'>
                                            Nombre de insumo largo
                                        </p>
                                    </Skeleton>
                                    <Skeleton className='rounded-full'>
                                        <p className='text-tiny text-foreground-400 !leading-none'>
                                            Insumo
                                        </p>
                                    </Skeleton>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardBody>
        </Card>
    );
}

export default IngredientsListSkeleton;
