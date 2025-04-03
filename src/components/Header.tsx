'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { IoSearchOutline } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';
import Account from './Account';
import Cart from './Cart';
import Favorite from './Favorite';
import Search from './Search';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [searchOpen, setSearchOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <header className="bg-white text-black dark:bg-black dark:text-white">
      <nav className="container flex items-center justify-between gap-10 p-4">
        {/* left */}
        <button
          onClick={() => pathname !== '/' && router.push('/')}
          className="cursor-pointer text-xl font-bold whitespace-nowrap uppercase"
        >
          The One
        </button>

        {/* middle */}
        <ul className="flex items-center gap-5 whitespace-nowrap">
          <li>
            <button
              className={cn(
                'flex h-9 cursor-pointer items-center justify-center gap-1 rounded-md px-3 font-medium transition-colors',
                shopOpen ? 'bg-gray-100 text-blue-500' : 'hover:bg-gray-100 hover:text-blue-500',
              )}
              onClick={() => setShopOpen(!shopOpen)}
            >
              Shop <IoIosArrowDown className={shopOpen ? 'rotate-180' : 'rotate-0'} />
            </button>
          </li>
          <li>
            <button
              onClick={() => !pathname.includes('on-sale') && router.push('/on-sale')}
              className={cn(
                'cursor-pointer transition-colors hover:text-blue-500',
                pathname.includes('on-sale') && 'text-blue-500',
              )}
            >
              On Sale
            </button>
          </li>
          <li>
            <button
              onClick={() => !pathname.includes('new-arrivals') && router.push('/new-arrivals')}
              className={cn(
                'cursor-pointer transition-colors hover:text-blue-500',
                pathname.includes('new-arrivals') && 'text-blue-500',
              )}
            >
              New Arrivals
            </button>
          </li>
        </ul>

        {/* right */}
        <div className="flex items-center gap-2">
          <Search />
          <Favorite />
          <Cart />
          <Account />
        </div>
      </nav>
    </header>
  );
};

export default Header;
