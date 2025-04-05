import { accountMenuItems } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoIosArrowDown, IoIosLogOut } from 'react-icons/io';

const userData = {
  name: 'John Doe',
  email: 'John.Doe@gmail.com',
  profileUrl: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
};

const Account = () => {
  const [accountOpen, setAccountOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setAccountOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className={cn(
          'flex h-9 cursor-pointer items-center gap-1 rounded-md px-3 transition-colors',
          accountOpen
            ? 'bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15'
            : 'hover:bg-black/5 dark:hover:bg-white/10',
        )}
        onClick={() => setAccountOpen(!accountOpen)}
      >
        <FaRegUserCircle className="size-5" />{' '}
        <IoIosArrowDown className={accountOpen ? 'rotate-180' : 'rotate-0'} />
      </button>

      {accountOpen && (
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
              <h3 className="truncate text-sm font-medium">{userData?.name}</h3>
              <p className="text-muted-foreground truncate text-sm">{userData?.email}</p>
            </div>

            <button
              onClick={() => !pathname.includes('profile') && router.push('/profile')}
              className="h-8 w-full cursor-pointer rounded-sm border text-sm hover:bg-gray-100 hover:text-red-500 dark:hover:bg-white/5"
            >
              View Profile
            </button>
          </div>
          <div className="px-2 text-sm font-medium">
            {accountMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => !pathname.includes(item.url) && router.push(item.url)}
                className={cn(
                  'group flex h-9 w-full cursor-pointer items-center gap-2 rounded-sm px-3',
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
          <div className="px-2 pb-2 text-sm font-medium">
            <button className="group flex h-9 w-full cursor-pointer items-center gap-2 rounded-sm px-3 text-red-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/20">
              <IoIosLogOut className="size-4" /> Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
