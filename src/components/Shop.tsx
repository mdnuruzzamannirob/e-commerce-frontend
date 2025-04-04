import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';
import { MdOutlineShoppingBag } from 'react-icons/md';

const categories = [
  {
    title: 'Electronics',
    items: [
      'TV & Home Cinema',
      'Phones',
      'Computers',
      'Consoles/Gaming',
      'Camera & Photo',
      'Monitors',
      'Audio & HiFi',
      'Headphones',
      'Computer Components',
      'Headphones',
      'Home Cinema',
      'Sat Nav & Car Electronics',
      'Video Hardware',
      'Office Electronics',
      'Smart Home',
    ],
  },
  {
    title: 'Food & Grocery',
    items: [
      'Bakery and Bread',
      'Meat and Seafood',
      'Pasta and Rice',
      'Cereals and Breakfast Foods',
      'Frozen Foods',
      'Dairy, Cheese, and Eggs',
      'Snacks and Crackers',
      'Fruits',
      'Soup & Canned Goods',
      'Beer, Wine & Spirits',
      'Luxury Food & Drink',
      'Petshop',
      'Kitchen detergents',
      'Non-Alcoholic Drinks',
      'Vouchers',
    ],
  },
  {
    title: 'Fashion',
    items: [
      'Women’s Clothing',
      'Women’s Shoes',
      'Women’s Accessories',
      'Children’s Clothing',
      'Children’s Shoes',
      'Children’s Accessories',
      'Men’s Clothing',
      'Men’s Shoes',
      'Men’s Accessories',
    ],
  },
  {
    title: 'Sports & Outdoors',
    items: [
      'Sport Clothes',
      'Sport Shoes',
      'Cycling',
      'Football',
      'Camping',
      'Fishing',
      'Tennis',
      'Paddle sports',
      'Team Sports',
      'Hike',
      'Running',
      'Fitness & Nutrition',
      'Sports Accessories',
      'Tents',
      'Other Sport activities',
    ],
  },
];

const Shop = () => {
  const [shopOpen, setShopOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShopOpen(false);
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
          'relative flex h-9 cursor-pointer items-center justify-center gap-1 rounded-md px-3 text-sm font-medium transition-colors',
          shopOpen
            ? 'bg-gray-100 text-blue-500 hover:bg-gray-200'
            : 'hover:bg-gray-100 hover:text-blue-500',
        )}
        onClick={() => setShopOpen(!shopOpen)}
      >
        Shop <IoIosArrowDown className={shopOpen ? 'rotate-180' : 'rotate-0'} />
      </button>

      {shopOpen && (
        <div className="fixed inset-x-0 top-14 z-50 max-h-[calc(100vh-56px)] overflow-y-auto border-b bg-white">
          <div className="mx-auto h-full max-w-7xl space-y-5 bg-white px-4 py-5 sm:px-6 lg:px-8">
            <div className="grid h-full w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category, index) => (
                <div key={index} className="space-y-4 text-sm">
                  <h2 className="flex items-center gap-1 font-semibold">
                    <MdOutlineShoppingBag className="size-5" /> {category.title}
                  </h2>
                  <div className="flex flex-col items-start gap-2">
                    {category.items.map((item, idx) => (
                      <button
                        key={idx}
                        className="text-muted-foreground cursor-pointer hover:text-inherit hover:underline"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button className="flex h-10 w-full items-center justify-center gap-2 rounded-sm border border-gray-200 text-sm font-medium hover:bg-gray-100 hover:text-blue-500">
              See all categories <FaArrowRightLong />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
