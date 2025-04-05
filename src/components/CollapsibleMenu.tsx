import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Logo from './Logo';
import { IoCloseOutline } from 'react-icons/io5';

const NAV_ITEMS = [
  { name: 'Docs', path: '/docs' },
  { name: 'Blocks', path: '/blocks' },
  { name: 'Figma', path: '/figma' },
  { name: 'Icons', path: '/icons' },
  { name: 'Illustrations', path: '/illustrations' },
  { name: 'Blog', path: '/blog' },
  { name: 'Pricing & FAQ', path: '/pricing' },
];

const CollapsibleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="lg:hidden">
      {/* Menu Toggle Button */}
      <button
        className={cn(
          'flex size-9 items-center justify-center rounded-md transition-colors',
          isOpen
            ? 'bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15'
            : 'hover:bg-black/5 dark:hover:bg-white/10',
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <AiOutlineClose className="size-5" /> : <AiOutlineMenu className="size-5" />}
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Content */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 transform space-y-3 border-r bg-white p-3 shadow-sm transition-transform duration-300 ease-in-out dark:bg-black',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b pb-3">
          <Logo />

          <button
            aria-label="Close search"
            className="flex size-8 items-center justify-center rounded-md hover:bg-black/5 sm:size-9 dark:hover:bg-white/10"
            onClick={() => setIsOpen(false)}
          >
            <IoCloseOutline className="size-6" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav>
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    'w-full rounded-md px-3 py-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-700',
                    pathname.includes(item.path) && 'bg-gray-100 font-medium dark:bg-gray-700',
                  )}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CollapsibleMenu;
