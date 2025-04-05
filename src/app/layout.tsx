import { Sora, Nunito_Sans, Open_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/provider/ThemeProvider';

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito-sans',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
});

export const metadata = {
  title: 'The-1 | Your Ultimate E-Commerce Destination',
  description:
    'Discover the best products and deals on The-1, your ultimate e-commerce destination. Shop now for an unparalleled shopping experience.',
  keywords: 'e-commerce, online shopping, best deals, The-1, shop online, nextjs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('antialiased', nunitoSans.variable, openSans.variable, sora.variable)}>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
