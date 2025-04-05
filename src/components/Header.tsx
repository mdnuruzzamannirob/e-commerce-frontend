'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import Shop from './Shop';
import Search from './Search';
import Favorite from './Favorite';
import Cart from './Cart';
import Account from './Account';
import Language from './Language';

type NavItem = {
  name: string;
  path: string;
};

const NAV_ITEMS: NavItem[] = [
  { name: 'Shop', path: '/shop' },
  { name: 'On Sale', path: '/on-sale' },
  { name: 'New Arrivals', path: '/new-arrivals' },
  { name: 'FAQ', path: '/FAQ' },
  { name: 'Contact Us', path: '/contact-us' },
  { name: 'About Us', path: '/about-us' },
  { name: 'Blog', path: '/blog' },
];

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    if (!pathname.includes(path)) {
      router.push(path);
    }
  };

  return (
    <header className="border-b bg-white text-black dark:bg-black dark:text-white">
      <nav className="container flex items-center justify-between gap-10 p-4">
        {/* Left Section */}
        <div className="flex items-center gap-10">
          <Logo />
          <div className="flex items-center gap-2">
            <Language />
            <Search />
          </div>
        </div>

        {/* Middle Navigation */}
        <ul className="flex items-center gap-5 whitespace-nowrap">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              {item.name === 'Shop' ? (
                <Shop />
              ) : (
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    'cursor-pointer text-sm transition-colors hover:text-blue-500',
                    pathname.includes(item.path) && 'text-blue-500',
                  )}
                >
                  {item.name}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Favorite />
          <Cart />
          <Account />
        </div>
      </nav>
    </header>
  );
};

export default Header;
