import Material from '@/(common)/entities/Material';
import { Button } from '@nextui-org/button';
import MaterialDetailsInput from './MaterialDetailsInput';

type MaterialDetailsProps = {
    material: Material;
};

function MaterialDetails(props: MaterialDetailsProps) {
    const { material } = props;

    return (
        <form className='flex flex-col gap-8'>
            <div className='flex justify-between flex-wrap gap-4'>
                <h1 className='text-2xl font-bold'>Coca cola fría</h1>
                <div className='flex gap-2'>
                    <Button variant='flat'>Editar</Button>
                    <Button color='danger'>Borrar</Button>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <MaterialDetailsInput
                    isEditable={false}
                    label='N° Insumo'
                    defaultValue={material.id.toString()}
                />
            </div>
        </form>
    );
}

export default MaterialDetails;
