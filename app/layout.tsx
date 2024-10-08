import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import Footer from './components/Footer';
import Header from './components/Header';
import './globals.css';
import { SWRProvider } from './lib/SWRProvider';

export const metadata = {
	title: 'Next.js',
	description: 'Generated by Next.js',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="relative">
				<SWRProvider>
					<Theme hasBackground={false}>
						<nav className="fixed left-0 top-0 w-60 h-screen shadow-[1px_0_0_0_#2b2f3c] z-10">
							sidenav
						</nav>
						<header className="fixed top-0 left-60 w-[calc(100vw-15rem)]">
							<Header />
						</header>
						<div className="ml-60 mt-20 flex flex-col justify-between h-screen">
							<div className="container mx-auto px-28">{children}</div>
							<Footer />
						</div>
					</Theme>
				</SWRProvider>
			</body>
		</html>
	);
}
