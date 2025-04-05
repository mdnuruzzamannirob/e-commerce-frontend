import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineFile,
  AiOutlineShopping,
  AiOutlineAppstore,
  AiOutlineCreditCard,
  AiOutlineFileText,
  AiOutlineDashboard,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineTransaction,
  AiOutlineBarChart,
  AiOutlineTeam,
  AiOutlineShop,
  AiOutlineTags,
  AiOutlineContainer,
} from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import Logo from './Logo';
import { IoCloseOutline } from 'react-icons/io5';

type MenuItem = {
  name: string;
  path: string | null;
  icon: React.ReactNode;
  children?: MenuItem[];
};

const NAV_ITEMS: MenuItem[] = [
  {
    name: 'Overview',
    path: '/overview',
    icon: <AiOutlineHome className="size-4" />,
  },
  {
    name: 'Pages',
    path: null,
    icon: <AiOutlineFile className="size-4" />,
    children: [
      {
        name: 'Dashboard',
        path: '/pages/dashboard',
        icon: <AiOutlineDashboard className="size-4" />,
        children: [
          {
            name: 'Analytics',
            path: '/pages/dashboard/analytics',
            icon: <AiOutlineBarChart className="size-4" />,
          },
          {
            name: 'Projects',
            path: '/pages/dashboard/projects',
            icon: <AiOutlineAppstore className="size-4" />,
          },
        ],
      },
      {
        name: 'Settings',
        path: '/pages/settings',
        icon: <AiOutlineSetting className="size-4" />,
        children: [
          {
            name: 'Account',
            path: '/pages/settings/account',
            icon: <AiOutlineUser className="size-4" />,
          },
          {
            name: 'Security',
            path: '/pages/settings/security',
            icon: <AiOutlineContainer className="size-4" />,
          },
        ],
      },
      {
        name: 'Profile',
        path: '/pages/profile',
        icon: <AiOutlineUser className="size-4" />,
      },
    ],
  },
  {
    name: 'Sales',
    path: '/sales',
    icon: <AiOutlineShopping className="size-4" />,
    children: [
      {
        name: 'Transactions',
        path: '/sales/transactions',
        icon: <AiOutlineTransaction className="size-4" />,
        children: [
          {
            name: 'New',
            path: '/sales/transactions/new',
            icon: <AiOutlineFileText className="size-4" />,
          },
          {
            name: 'History',
            path: '/sales/transactions/history',
            icon: <AiOutlineBarChart className="size-4" />,
          },
        ],
      },
      {
        name: 'Reports',
        path: '/sales/reports',
        icon: <AiOutlineBarChart className="size-4" />,
      },
      {
        name: 'Customers',
        path: '/sales/customers',
        icon: <AiOutlineTeam className="size-4" />,
      },
    ],
  },
  {
    name: 'Products',
    path: '/products',
    icon: <AiOutlineShop className="size-4" />,
    children: [
      {
        name: 'Inventory',
        path: '/products/inventory',
        icon: <AiOutlineContainer className="size-4" />,
      },
      {
        name: 'Categories',
        path: '/products/categories',
        icon: <AiOutlineTags className="size-4" />,
      },
    ],
  },
  {
    name: 'Billing',
    path: '/billing',
    icon: <AiOutlineCreditCard className="size-4" />,
  },
  {
    name: 'Invoice',
    path: '/invoice',
    icon: <AiOutlineFileText className="size-4" />,
  },
];

const CollapsibleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleNavigation = (path: string | null) => {
    if (path) {
      router.push(path);
      setIsOpen(false);
    }
  };

  const toggleSubmenu = (itemName: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const renderMenuItems = (items: MenuItem[], level = 0) => {
    return items.map((item, index) => (
      <li key={index} className="flex flex-col gap-1">
        <button
          onClick={() => {
            if (item.children) {
              toggleSubmenu(item.name);
            } else {
              handleNavigation(item.path);
            }
          }}
          className={cn(
            'flex w-full items-center justify-between gap-3 rounded-sm px-3 py-2 transition-colors',
            pathname.includes(item.path as string)
              ? 'bg-gray-100 dark:bg-white/10'
              : openSubmenus[item.name]
                ? 'bg-gray-100 dark:bg-white/10'
                : 'text-muted-foreground hover:bg-black/5 hover:text-inherit dark:hover:bg-white/10',
          )}
        >
          {item.name}
          {item.children && (
            <IoIosArrowDown className={openSubmenus[item.name] ? 'rotate-180' : 'rotate-0'} />
          )}
        </button>

        {/* Submenu Items */}
        {item.children && openSubmenus[item.name] && (
          <ul className={cn('space-y-1 border-l border-black/10 pl-2 dark:border-white/10')}>
            {renderMenuItems(item.children, level + 1)}
          </ul>
        )}
      </li>
    ));
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
          'fixed inset-y-0 left-0 z-50 w-80 transform space-y-3 overflow-y-auto border-r bg-white p-3 shadow-sm transition-transform duration-300 ease-in-out dark:bg-black',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b pb-3">
          <Logo />

          <button
            aria-label="Close menu"
            className="flex size-8 items-center justify-center rounded-md hover:bg-black/5 sm:size-9 dark:hover:bg-white/10"
            onClick={() => setIsOpen(false)}
          >
            <IoCloseOutline className="size-6" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav>
          <ul className="space-y-1">{renderMenuItems(NAV_ITEMS)}</ul>
        </nav>
      </div>
    </div>
  );
};

export default CollapsibleMenu;
