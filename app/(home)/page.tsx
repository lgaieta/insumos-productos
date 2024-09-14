import NavigationCard from '@/(home)/components/NavigationCard';
import Link from 'next/link';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { BsBoxSeam } from 'react-icons/bs';
import { TbPigMoney, TbShirt } from 'react-icons/tb';

export default function Home() {
    return (
        <main className='flex flex-col items-center px-8 py-12 w-full text-foreground-900 bg-background'>
            <h1 className='text-4xl font-bold mb-12 text-center'>Costos y Precios</h1>
            <nav className='grid grid-cols-1 gap-8 max-w-[280px] sm:max-w-[600px] w-full sm:grid-cols-2 lg:max-w-[800px]'>
                <Link href='/insumos'>
                    <NavigationCard
                        title='Insumos'
                        subtitle='Costos de materiales'
                        bodyContent={
                            <BsBoxSeam
                                size='100%'
                                color='#212121'
                            />
                        }
                    />
                </Link>
                <Link href='/productos'>
                    <NavigationCard
                        title='Productos'
                        subtitle='Artículos listos para vender'
                        bodyContent={
                            <TbShirt
                                size='100%'
                                color='#212121'
                            />
                        }
                    />
                </Link>
                <NavigationCard
                    title='Compras'
                    subtitle='Gastos en insumos'
                    bodyContent={
                        <MdOutlineAddShoppingCart
                            className='p-4'
                            size='100%'
                            color='#212121'
                        />
                    }
                />
                <NavigationCard
                    title='Ventas'
                    subtitle='Transacciones completadas'
                    bodyContent={
                        <TbPigMoney
                            className='p-4'
                            size='100%'
                            color='#212121'
                        />
                    }
                />
            </nav>
        </main>
    );
}
