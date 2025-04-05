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
import CollapsibleMenu from './CollapsibleMenu';

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
      <nav className="container flex items-center justify-between p-3 sm:gap-10">
        {/* Left Section */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-10">
          {/* Mobile Navigation */}
          <CollapsibleMenu />

          <Logo />
          <div className="flex items-center gap-2 max-lg:hidden">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <SearchModal />
          </div>
        </div>

        {/* Middle Navigation */}
        <ul className="max flex items-center gap-5 whitespace-nowrap max-lg:hidden">
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
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center gap-1 sm:gap-2 min-lg:hidden">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <SearchModal />
          </div>
          <FavoriteItemsView />
          <ShoppingCartView />
          <AccountMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
