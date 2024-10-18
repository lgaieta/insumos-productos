import { CardBody } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import Material from '@common/entities/Material';

type MaterialCardEditableBodyProps = {
    material: Material;
};

function MaterialCardEditableBody(props: MaterialCardEditableBodyProps) {
    const { material } = props;

    return (
        <CardBody className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div className='flex flex-col w-full px-3 py-[10px]'>
                <p className='font-bold h-[20px] leading-none'>N° Insumo</p>
                <p>{material.id.toString()}</p>
            </div>
            <Input
                label='Nombre'
                name='name'
                defaultValue={material.name}
                classNames={{
                    label: '!text-base !font-bold text-foreground',
                }}
                size='lg'
                isClearable
                isRequired
                autoFocus
            />
            <Input
                label='Precio'
                name='price'
                defaultValue={material.price.toString()}
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
                defaultValue={material.link || undefined}
                classNames={{
                    label: '!text-base !font-bold text-foreground',
                }}
                size='lg'
                isClearable
                placeholder='Copie el link del insumo y péguelo aquí'
            />
        </CardBody>
    );
}

export default MaterialCardEditableBody;
