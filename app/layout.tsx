import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Insumos y Productos',
    description: 'Aplicación de gestión de insumos y productos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='es'>
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
