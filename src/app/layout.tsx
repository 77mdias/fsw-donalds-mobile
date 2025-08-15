//IMPORT DE ARQUIVOS
import './globals.css';

//IMPORT DE DEPENDÊNCIAS
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';

import { CartProvider } from '@/app/[slug]/menu/contexts/cart';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'FSW Donalds',
	description: 'Bora finalizar esse projeto!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className={`${poppins.className} antialiased`}>
				<CartProvider>
					{children}
				</CartProvider>
				<Toaster />
			</body>
		</html>
	);
}
