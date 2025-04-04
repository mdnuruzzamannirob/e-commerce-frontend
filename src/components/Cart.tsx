import { demoCartData } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoCartOutline } from 'react-icons/io5';
import { LuMinus, LuPlus } from 'react-icons/lu';

const Cart = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setCartOpen(false);
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

  const totalAmount = demoCartData?.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className={cn(
          'relative flex size-9 cursor-pointer items-center justify-center gap-2 rounded-md transition-colors',
          cartOpen
            ? 'bg-black/5 text-blue-500 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15'
            : 'hover:bg-black/5 hover:text-blue-500 dark:hover:bg-white/10',
        )}
        onClick={() => setCartOpen(!cartOpen)}
      >
        <IoCartOutline className="size-5" />
        {demoCartData?.length > 0 && (
          <span className="absolute top-0 right-0 h-4 min-w-4 rounded-md bg-red-500 px-[2px] text-xs text-white">
            {demoCartData?.length}
          </span>
        )}
      </button>

      {cartOpen && (
        <div className="absolute top-full right-0 mt-1 w-96 min-w-0 rounded-md border bg-white shadow-sm dark:bg-black">
          <div className="flex items-center justify-between gap-2 border-b p-3">
            <h3 className="font-semibold"> Shopping cart</h3>
            <p className="">{demoCartData?.length} items</p>
          </div>

          <div className="">
            {demoCartData.map((item, index) => (
              <div
                key={index}
                className="flex size-full justify-between gap-2 p-3 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <div className="flex min-w-0 flex-2/3 items-center gap-2">
                  <button
                    onClick={() => !pathname.includes(item.url) && router.push(item.url)}
                    className="cursor-pointer"
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
                  <div className="min-w-0 text-sm">
                    <h3
                      onClick={() => !pathname.includes(item.url) && router.push(item.url)}
                      className="cursor-pointer truncate font-semibold hover:underline"
                    >
                      {item?.name}
                    </h3>
                    <p className="text-muted-foreground truncate">{item?.variant}</p>
                  </div>
                </div>
                <div className="flex flex-1/3 items-center justify-between gap-2">
                  <button className="flex size-6 cursor-pointer items-center justify-center rounded-sm border transition-colors hover:bg-gray-200 dark:hover:bg-white/10">
                    <LuMinus />
                  </button>
                  <p className="text-sm font-medium"> {item?.quantity}</p>
                  <button className="flex size-6 cursor-pointer items-center justify-center rounded-sm border transition-colors hover:bg-gray-200 dark:hover:bg-white/10">
                    <LuPlus />
                  </button>
                  <button className="flex size-6 cursor-pointer items-center justify-center rounded-sm bg-red-50 text-red-500 transition-colors hover:bg-red-100 dark:bg-red-500/15 dark:hover:bg-red-500/25">
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="border-b"></p>
          <div className="flex items-center justify-between gap-2 p-3">
            <h3 className="font-semibold">Total</h3>
            <p className="">${totalAmount}</p>
          </div>

          <div className="p-3 text-sm font-medium">
            <button className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-blue-500 px-3 text-white hover:bg-blue-600">
              View Cart Items
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
