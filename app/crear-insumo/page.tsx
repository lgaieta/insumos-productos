import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import mysql from 'mysql2/promise';

function CreateMaterialPage() {
    async function create(formData: FormData) {
        'use server';

        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            user: process.env.DB_USER,
            database: process.env.DB_DBNAME,
        });

        const name = formData.get('name');
        const price = formData.get('price');

        await pool.query(
            'INSERT INTO INSUMO (NOMBRE, COSTO_UNITARIO) VALUES (?, ?)',
            [name, price],
        );

        console.log('Success!');
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
