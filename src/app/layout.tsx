import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const sora = Sora({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-sora',
});

export const metadata: Metadata = {
  title: 'The One',
  description:
    'The One is a modern e-commerce platform that offers a wide range of products and services to meet the needs of its customers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${sora.className} bg-zinc-100 antialiased dark:bg-zinc-900`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
