import Material from '@/(common)/entities/Material';
import { Button } from '@nextui-org/button';
import MaterialDetailsInput from './MaterialDetailsInput';
import { Avatar } from '@nextui-org/avatar';
import { Divider } from '@nextui-org/divider';
import NextLink from 'next/link';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';

type MaterialDetailsProps = {
    material: Material & { image: string | null };
};

function MaterialDetails(props: MaterialDetailsProps) {
    const { material } = props;

    return (
        <form>
            <Card>
                <CardHeader className='justify-between p-5 flex-wrap gap-4'>
                    <div className='flex items-center gap-3'>
                        <Avatar
                            size='lg'
                            src={material.image || undefined}
                            showFallback={material.image === null}
                        />
                        <h1 className='text-2xl font-bold'>{material.name}</h1>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <MaterialDetailsInput
                        isEditable={false}
                        label='N° Insumo'
                        defaultValue={material.id.toString()}
                    />
                    <MaterialDetailsInput
                        isEditable={false}
                        label='Nombre'
                        defaultValue={material.name}
                    />
                    <MaterialDetailsInput
                        isEditable={false}
                        label='Precio'
                        startContent={
                            <div className='pointer-events-none flex items-center'>$</div>
                        }
                        defaultValue={material.price.toString()}
                    />
                    <div className='flex flex-col gap-1 px-3 py-[10px]'>
                        <p className='text-base font-bold text-foreground'>Link</p>
                        {material.link ? (
                            <Button
                                className='w-fit'
                                as={NextLink}
                                href={material.link}
                                variant='ghost'
                                color='primary'
                            >
                                Visitar link
                            </Button>
                        ) : (
                            <p>Vacío</p>
                        )}
                    </div>
                </CardBody>
                <Divider />
                <CardFooter className='w-full gap-2 justify-end'>
                    <Button variant='flat'>Editar</Button>
                    <Button color='danger'>Borrar</Button>
                </CardFooter>
            </Card>
        </form>
    );
}

export default MaterialDetails;
