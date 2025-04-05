import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { IoMdTime } from 'react-icons/io';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import { RiSearch2Line } from 'react-icons/ri';

const SearchModal = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock data
  const suggestedResults = [
    'Apple iMac 2024 (All-in-One PC)',
    'Samsung Galaxy S24 Ultra (1Tb, Titanium Violet)',
    'MacBook Pro 14-inch M3 - Space Gray - Apple',
  ];

  const searchHistory = [
    'Microsoft - Surface Laptop, Platinum, 256 GB SSD',
    'Huawei - P40 Lite - Smartphone 128GB, Black',
  ];

  const featuredProducts = [
    { name: 'Apple iMac 2024, 27″, 256GB', stars: '⭐⭐⭐⭐', rating: 4.95, price: 1799 },
    { name: 'Apple iPad PRO, 12″, Space Gray', stars: '⭐⭐⭐⭐', rating: 4.7, price: 999 },
    { name: 'Apple MacBook PRO, 1TB', stars: '⭐⭐⭐⭐', rating: 4.8, price: 2999 },
  ];

  const categories = [
    'Computer & Office',
    'Collectibles & Toys',
    'Books',
    'Fashion/Clothes',
    'Sports & Outdoors',
    'Painting & Hobby',
  ];

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.body.classList.add('overflow-hidden');
      inputRef.current?.focus();
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  return (
    <div className="relative">
      <button
        aria-label="Open search"
        className={cn(
          'flex size-9 items-center justify-center rounded-md transition-colors',
          searchOpen
            ? 'bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15'
            : 'hover:bg-black/5 dark:hover:bg-white/10',
        )}
        onClick={() => setSearchOpen(true)}
      >
        <RiSearch2Line className="size-5" />
      </button>

      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
        >
          <div className="flex h-full w-full items-start justify-center p-4 sm:p-6">
            <div
              ref={contentRef}
              className="flex size-full max-w-4xl flex-col space-y-3 rounded-md bg-white p-3 sm:space-y-4 sm:p-5 dark:border dark:bg-black"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h5 className="font-semibold">Advanced search</h5>
                <button
                  aria-label="Close search"
                  className="flex size-7 items-center justify-center rounded-md hover:bg-black/5 sm:size-9 dark:hover:bg-white/10"
                  onClick={() => setSearchOpen(false)}
                >
                  <IoCloseOutline className="size-5" />
                </button>
              </div>

              {/* Search Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log('Search query:', query);
                }}
              >
                <div className="relative">
                  <IoSearchOutline className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 sm:size-5" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search anything..."
                    className="w-full rounded-md border py-2 pr-3 pl-10 outline-none focus:border-transparent focus:ring-2 focus:ring-red-500 sm:py-3 sm:text-base"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </form>

              {/* Content Container */}
              <div className="flex-1 space-y-3 overflow-y-auto sm:space-y-4">
                {/* Suggested Results */}
                <div className="space-y-2">
                  <h6 className="font-semibold">Suggested results</h6>
                  <ul className="space-y-2">
                    {suggestedResults.map((result, index) => (
                      <li key={index} className="text-muted-foreground flex items-center gap-1">
                        <IoSearchOutline />{' '}
                        <span className="cursor-pointer hover:underline">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Search History */}
                <div className="space-y-2">
                  <h6 className="font-semibold">History</h6>
                  <ul className="space-y-2">
                    {searchHistory.map((item, index) => (
                      <li key={index} className="text-muted-foreground flex items-center gap-1">
                        <IoMdTime />
                        <span className="cursor-pointer hover:underline">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Featured Products */}
                <div className="space-y-2">
                  <h6 className="font-semibold">Featured products</h6>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {featuredProducts.map((product, index) => (
                      <div
                        key={index}
                        className="min-w-0 space-y-2 rounded-md border p-3 hover:shadow-md"
                      >
                        <div className="aspect-square rounded-sm bg-black/5 dark:bg-white/5" />
                        <h6 className="truncate font-medium">{product.name}</h6>
                        <div className="flex flex-wrap items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-500">{product.stars}</span>
                            <span className="text-gray-500">{product.rating}</span>
                          </div>
                          <span className="font-semibold sm:text-base">
                            ${product.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Categories */}
                <div className="space-y-2">
                  <h6 className="font-semibold">All categories</h6>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className="text-muted-foreground rounded-md border p-2 text-left hover:bg-black/5 dark:hover:bg-white/5"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModal;
