import { accountMenuItems } from '@/constants';
import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoIosArrowDown, IoIosLogOut } from 'react-icons/io';

const userData = {
  name: 'John Doe',
  email: 'John.Doe@gmail.com',
  profileUrl: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
};

const AccountMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className={cn(
          'flex h-9 items-center gap-1 rounded-md px-3 transition-colors',
          isOpen
            ? 'bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15'
            : 'hover:bg-black/5 dark:hover:bg-white/10',
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaRegUserCircle className="size-5" />{' '}
        <IoIosArrowDown className={isOpen ? 'rotate-180' : 'rotate-0'} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-60 min-w-0 space-y-2 rounded-md border bg-white shadow-sm dark:bg-black">
          <div className="flex flex-col items-center gap-2 border-b p-2">
            <Image
              src={userData?.profileUrl}
              alt="profile"
              width={32}
              height={32}
              className="rounded-md"
            />
            <div className="w-full text-center">
              <h6 className="truncate font-medium">{userData?.name}</h6>
              <p className="text-muted-foreground truncate">{userData?.email}</p>
            </div>

            <button
              onClick={() => !pathname.includes('profile') && router.push('/profile')}
              className="h-8 w-full rounded-sm border hover:bg-gray-100 hover:text-red-500 dark:hover:bg-white/5"
            >
              View Profile
            </button>
          </div>
          <div className="px-2 font-medium">
            {accountMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => !pathname.includes(item.url) && router.push(item.url)}
                className={cn(
                  'group flex h-9 w-full items-center gap-2 rounded-sm px-3',
                  pathname.includes(item.url)
                    ? 'bg-black/5 dark:bg-white/15'
                    : 'text-muted-foreground hover:bg-black/5 hover:text-inherit dark:hover:bg-white/15',
                )}
              >
                {item.icon} {item.text}
              </button>
            ))}
          </div>
          <p className="border-b"></p>
          <div className="px-2 pb-2 font-medium">
            <button className="group flex h-9 w-full items-center gap-2 rounded-sm px-3 text-red-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/20">
              <IoIosLogOut className="size-4" /> Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
