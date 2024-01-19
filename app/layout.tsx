import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/providers';
import Header from '@/(common)/components/header/Header';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
    title: 'Insumos y productos',
    description: 'Aplicación de gestión de insumos y productos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='es'>
            <body className={inter.className}>
                <Providers>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
