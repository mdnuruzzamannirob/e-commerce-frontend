import { demoCartData } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdFavoriteBorder } from 'react-icons/md';

const FavoriteItemsView = () => {
  const [favoriteOpen, setFavoriteOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setFavoriteOpen(false);
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
          'relative flex size-9 items-center justify-center gap-2 rounded-md transition-colors',
          favoriteOpen
            ? 'bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15'
            : 'hover:bg-black/5 dark:hover:bg-white/10',
        )}
        onClick={() => setFavoriteOpen(!favoriteOpen)}
      >
        <MdFavoriteBorder className="size-5" />
        {demoCartData?.length > 0 && (
          <span className="absolute top-0 right-0 h-4 min-w-4 rounded-md bg-red-500 px-[2px] text-xs text-white">
            {demoCartData?.length}
          </span>
        )}
      </button>

      {favoriteOpen && (
        <div className="absolute top-full right-0 mt-1 w-96 min-w-0 rounded-md border bg-white shadow-sm dark:bg-black">
          <div className="flex items-center justify-between gap-2 border-b p-3">
            <h5 className="font-semibold">Favorite Items</h5>
            <p>{demoCartData?.length} items</p>
          </div>

          <div className="">
            {demoCartData.map((item, index) => (
              <div
                key={index}
                className="flex size-full items-center justify-between gap-2 p-3 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <div className="flex w-full min-w-0 items-center gap-2">
                  <button
                    onClick={() => !pathname.includes(item.url) && router.push(item.url)}
                    className="size-10 min-w-10"
                  >
                    <Image
                      src={
                        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png'
                      }
                      alt="profile"
                      width={40}
                      height={40}
                      className="rounded"
                    />
                  </button>
                  <div className="min-w-0">
                    <h6
                      onClick={() => !pathname.includes(item.url) && router.push(item.url)}
                      className="cursor-pointer truncate font-semibold hover:underline"
                    >
                      {item?.name}
                    </h6>
                    <p className="truncate">{item?.variant}</p>
                  </div>
                </div>

                <button className="flex size-6 items-center justify-center rounded-sm bg-red-50 text-red-500 transition-colors hover:bg-red-100 dark:bg-red-500/15 dark:hover:bg-red-500/25">
                  <AiOutlineDelete />
                </button>
              </div>
            ))}
          </div>
          <p className="border-b"></p>

          <div className="p-3 font-medium">
            <button className="flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-red-500 px-3 text-white hover:bg-red-600">
              View Favorite Items
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteItemsView;
