'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import ShopMenu from './ShopMenu';
import SearchModal from './SearchModal';
import FavoriteItemsView from './FavoriteItemsView';
import ShoppingCartView from './ShoppingCartView';
import AccountMenu from './AccountMenu';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

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
            <LanguageSwitcher />
            <ThemeSwitcher />
            <SearchModal />
          </div>
        </div>

        {/* Middle Navigation */}
        <ul className="flex items-center gap-5 whitespace-nowrap">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              {item.name === 'Shop' ? (
                <ShopMenu />
              ) : (
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    'transition-colors hover:text-red-500',
                    pathname.includes(item.path) && 'text-red-500',
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
          <FavoriteItemsView />
          <ShoppingCartView />
          <AccountMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
