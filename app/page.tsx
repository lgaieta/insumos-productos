'use client';

import NavigationCard from './NavigationCard';

export default function Home() {
    return (
        <main className='flex flex-col items-center px-8 py-16 w-full text-foreground-900 bg-background'>
            <h1 className='text-4xl font-bold mb-16 text-center'>
                Costos y Precios
            </h1>
            <div className='grid grid-cols-1 gap-8 max-w-[600px] w-full sm:grid-cols-2 lg:max-w-[800px]'>
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
            </div>
        </main>
    );
}
