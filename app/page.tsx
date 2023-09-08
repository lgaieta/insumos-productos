'use client';

import NavigationCard from './NavigationCard';

export default function Home() {
    return (
        <main className='flex flex-col items-center py-16 w-full text-foreground-900 bg-background'>
            <h1 className='text-4xl font-bold mb-16'>Costos y Precios</h1>
            <div className='columns-2 gap-12 max-w-[900px] w-full'>
                <NavigationCard
                    title='Insumos'
                    subtitle='Costos de materiales para fabricar productos'
                    imageProps={{
                        src: '/image 3.png',
                        alt: 'Insumos para elaborar productos',
                        width: '250',
                        height: '100',
                    }}
                />
                <NavigationCard
                    title='Insumos'
                    subtitle='Costos de materiales para fabricar productos'
                    imageProps={{
                        src: '/image 3.png',
                        alt: 'Insumos para elaborar productos',
                        width: '250',
                        height: '100',
                    }}
                />
                <NavigationCard
                    title='Insumos'
                    subtitle='Costos de materiales para fabricar productos'
                    imageProps={{
                        src: '/image 3.png',
                        alt: 'Insumos para elaborar productos',
                        width: '250',
                        height: '100',
                    }}
                />
                <NavigationCard
                    title='Insumos'
                    subtitle='Costos de materiales para fabricar productos'
                    imageProps={{
                        src: '/image 3.png',
                        alt: 'Insumos para elaborar productos',
                        width: '250',
                        height: '100',
                    }}
                />
            </div>
        </main>
    );
}
