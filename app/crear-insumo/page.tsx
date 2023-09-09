import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';

function CreateMaterialPage() {
    async function create(formData: FormData) {
        'use server';
        console.log(formData.get('name'));
        console.log(formData.get('price'));
    }

    return (
        <main className='flex flex-col items-center px-8 py-12 w-full text-foreground-900 bg-background'>
            <h1 className='text-4xl font-bold mb-12 text-center'>
                Crear insumo
            </h1>
            <form
                className='flex flex-col gap-6 w-full max-w-[500px]'
                action={create}
            >
                <Input
                    type='text'
                    label='Nombre'
                    name='name'
                    variant='bordered'
                    placeholder='Ingrese el nombre del insumo'
                    labelPlacement='outside'
                    classNames={{ label: 'font-bold font-xl' }}
                    size='lg'
                />
                <Input
                    type='number'
                    label='Costo'
                    name='price'
                    variant='bordered'
                    placeholder='Ingrese el costo del insumo'
                    labelPlacement='outside'
                    endContent={
                        <div className='pointer-events-none flex items-center'>
                            <span className='text-foreground-400 text-base'>
                                $
                            </span>
                        </div>
                    }
                    classNames={{ label: 'font-bold font-xl' }}
                    size='lg'
                />
                <Button
                    color='primary'
                    size='lg'
                    type='submit'
                >
                    Continuar
                </Button>
            </form>
        </main>
    );
}

export default CreateMaterialPage;
