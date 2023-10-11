import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

function MaterialsPage() {
    return (
        <main className='flex flex-col items-center px-8 py-12 w-full text-foreground-900 bg-background'>
            <h1 className='text-4xl font-bold mb-12 text-center'>Insumos</h1>
            <div className='flex items-center justify-between max-w-[1000px] w-full'>
                <Input
                    size='sm'
                    radius='md'
                    type='text'
                    variant='bordered'
                    isClearable
                    label='Buscar'
                    classNames={{ base: 'max-w-[300px]' }}
                />
                <Button color='primary'>Nuevo Insumo</Button>
            </div>
        </main>
    );
}

export default MaterialsPage;
