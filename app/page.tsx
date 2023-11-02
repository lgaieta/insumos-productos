import NavigationCard from '@/(home)/components/NavigationCard';
import Link from 'next/link';

export default function Home() {
    return (
        <main className='flex flex-col items-center px-8 py-12 w-full text-foreground-900 bg-background'>
            <h1 className='text-4xl font-bold mb-12 text-center'>Costos y Precios</h1>
            <nav className='grid grid-cols-1 gap-8 max-w-[600px] w-full sm:grid-cols-2 lg:max-w-[800px]'>
                <Link href='/insumos'>
                    <NavigationCard
                        title='Insumos'
                        subtitle='Costos de materiales'
                        imageProps={{
                            src: '/image3.png',
                            alt: 'Insumos para elaborar productos',
                            width: '250',
                            height: '100',
                        }}
                    />
                </Link>
                <NavigationCard
                    title='Productos'
                    subtitle='Artículos listos para vender'
                    imageProps={{
                        src: '/image3.png',
                        alt: 'Productos listos para vender',
                        width: '250',
                        height: '100',
                    }}
                />
                <NavigationCard
                    title='Compras'
                    subtitle='Gastos en insumos'
                    imageProps={{
                        src: '/image3.png',
                        alt: 'Insumos para elaborar productos',
                        width: '250',
                        height: '100',
                    }}
                />
                <NavigationCard
                    title='Ventas'
                    subtitle='Transacciones completadas'
                    imageProps={{
                        src: '/image3.png',
                        alt: 'Insumos para elaborar productos',
                        width: '250',
                        height: '100',
                    }}
                />
            </nav>
        </main>
    );
}
