import { demoCartData } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoCartOutline } from 'react-icons/io5';
import { LuMinus, LuPlus } from 'react-icons/lu';

const userData = {
  name: 'John Doe',
  email: 'John.Doe@gmail.com',
  profileUrl: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
};

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

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className={cn(
          'flex size-9 cursor-pointer items-center justify-center gap-2 rounded-md transition-colors',
          cartOpen
            ? 'bg-gray-100 text-blue-500 hover:bg-gray-200'
            : 'hover:bg-gray-100 hover:text-blue-500',
        )}
        onClick={() => setCartOpen(!cartOpen)}
      >
        <IoCartOutline className="size-5" />
      </button>

      {cartOpen && (
        <div className="absolute top-full right-0 mt-1 w-96 min-w-0 rounded-md border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between gap-2 border-b border-gray-100 p-2">
            <h3 className="font-semibold"> Shopping cart</h3>
            <p className="">{demoCartData?.length} items</p>
          </div>

          <div className="">
            {demoCartData.map((item, index) => (
              <div
                key={index}
                className="flex size-full justify-between gap-2 p-2 hover:bg-gray-50"
              >
                <div className="flex min-w-0 flex-2/3 items-center gap-2">
                  <button
                    onClick={() => !pathname.includes(item.url) && router.push(item.url)}
                    className="cursor-pointer"
                  >
                    <Image
                      src={userData?.profileUrl}
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
                  <button className="flex size-7 cursor-pointer items-center justify-center rounded-sm border transition-colors hover:bg-gray-200">
                    <LuMinus />
                  </button>
                  <p className="text-sm font-medium"> {item?.quantity}</p>
                  <button className="flex size-7 cursor-pointer items-center justify-center rounded-sm border transition-colors hover:bg-gray-200">
                    <LuPlus />
                  </button>
                  <button className="flex size-7 cursor-pointer items-center justify-center rounded-sm bg-red-50 text-red-500 transition-colors hover:bg-red-100">
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="border-b border-gray-100"></p>
          <div className="flex items-center justify-between gap-2 p-2">
            <h3 className="font-semibold">Total</h3>
            <p className="">$43,796</p>
          </div>

          <div className="p-2 text-sm font-medium">
            <button className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-blue-500 px-3 text-white hover:bg-blue-600">
              View cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
