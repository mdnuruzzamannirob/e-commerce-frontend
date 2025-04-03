'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';
import { FaRegUserCircle } from 'react-icons/fa';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <header className="bg-white text-black dark:bg-black dark:text-white">
      <nav className="container flex items-center justify-between gap-10 p-4">
        <button
          onClick={() => pathname !== '/' && router.push('/')}
          className="cursor-pointer text-xl font-bold whitespace-nowrap uppercase"
        >
          The One
        </button>

        {/* navLink */}
        <ul className="flex items-center gap-5 whitespace-nowrap">
          <li>
            <button
              onClick={() => !pathname.includes('shop') && router.push('/shop')}
              className={cn(
                'cursor-pointer transition-colors hover:text-blue-500',
                pathname.includes('shop') && 'text-blue-500',
              )}
            >
              Shop
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

        {/* searchbar */}
        <div className="flex w-full items-center justify-between gap-2 rounded-full border px-4 py-2 text-sm dark:bg-zinc-800">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search"
            className="size-full font-light outline-none"
          />{' '}
          <IoSearchOutline className="size-4" />
        </div>

        {/* user */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => !pathname.includes('cart') && router.push('/cart')}
            className={cn(
              'cursor-pointer transition-colors hover:text-blue-500',
              pathname.includes('cart') && 'text-blue-500',
            )}
          >
            <IoCartOutline className="size-6" />
          </button>
          <button
            className={cn(
              'cursor-pointer transition-colors hover:text-blue-500',
              pathname.includes('user') && 'text-blue-500',
            )}
          >
            <FaRegUserCircle className="size-6" />
          </button>
          {/* <Button href="/login" variant="ghost">
            Login
          </Button>
          <Button href="/register">Register</Button> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
