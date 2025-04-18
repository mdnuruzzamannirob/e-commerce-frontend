import { demoCartData } from '@/constants';
import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoCartOutline } from 'react-icons/io5';
import { LuMinus, LuPlus } from 'react-icons/lu';

const ShoppingCartView = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const totalAmount = demoCartData?.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div ref={dropdownRef} className="min-sm:relative">
      <button
        className={cn(
          'relative flex size-9 items-center justify-center gap-2 rounded-md transition-colors',
          isOpen
            ? 'bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15'
            : 'hover:bg-black/5 dark:hover:bg-white/10',
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoCartOutline className="size-5" />
        {demoCartData?.length > 0 && (
          <span className="absolute top-0 right-0 h-4 min-w-4 rounded-md bg-red-500 px-[2px] text-xs text-white">
            {demoCartData?.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-80 min-w-0 rounded-md border bg-white shadow-sm sm:w-96 dark:bg-black">
          <div className="flex items-center justify-between gap-2 border-b p-3">
            <h5 className="font-semibold"> Shopping cart</h5>
            <p>{demoCartData?.length} items</p>
          </div>

          <div className="">
            {demoCartData.map((item, index) => (
              <div
                key={index}
                className="flex size-full justify-between gap-2 p-3 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <div className="flex min-w-0 flex-2/3 items-center gap-2">
                  <button onClick={() => !pathname?.includes(item.url) && router.push(item.url)}>
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
                      onClick={() => !pathname?.includes(item.url) && router.push(item.url)}
                      className="cursor-pointer truncate font-semibold hover:underline"
                    >
                      {item?.name}
                    </h6>
                    <p className="text-muted-foreground truncate">{item?.variant}</p>
                  </div>
                </div>
                <div className="flex flex-1/3 items-center justify-between gap-2">
                  <button className="flex size-6 items-center justify-center rounded-sm border transition-colors hover:bg-gray-200 dark:hover:bg-white/10">
                    <LuMinus />
                  </button>
                  <p className="font-medium"> {item?.quantity}</p>
                  <button className="flex size-6 items-center justify-center rounded-sm border transition-colors hover:bg-gray-200 dark:hover:bg-white/10">
                    <LuPlus />
                  </button>
                  <button className="flex size-6 items-center justify-center rounded-sm bg-red-50 text-red-500 transition-colors hover:bg-red-100 dark:bg-red-500/15 dark:hover:bg-red-500/25">
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="border-b"></p>
          <div className="flex items-center justify-between gap-2 p-3 font-semibold">
            <h5>Total</h5>
            <h5>${totalAmount}</h5>
          </div>

          <div className="p-3 font-medium">
            <button className="flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-red-500 px-3 text-white hover:bg-red-600">
              View Cart Items
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartView;
