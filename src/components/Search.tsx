import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';

const Search = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);
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
    { name: 'Apple iMac 2024, 27″, 256GB', rating: 4.95, price: 1799 },
    { name: 'Apple iPad PRO, 12″, Space Gray', rating: 4.7, price: 999 },
    { name: 'Apple MacBook PRO, 1TB', rating: 4.8, price: 2999 },
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
    if (searchOpen) {
      document.body.classList.add('overflow-hidden');
      inputRef.current?.focus();
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchOpen]);

  return (
    <div className="relative">
      <button
        aria-label="Open search"
        className={cn(
          'flex size-9 items-center justify-center rounded-md transition-colors',
          'hover:bg-gray-100 hover:text-blue-500 focus:outline-none',
          searchOpen && 'bg-gray-100 text-blue-500',
        )}
        onClick={() => setSearchOpen(true)}
      >
        <IoSearchOutline className="size-5" />
      </button>

      {searchOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === popoverRef.current) {
              setSearchOpen(false);
            }
          }}
        >
          <div className="absolute top-1/2 left-1/2 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 p-5">
            <div className="space-y-5 rounded-md bg-white p-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Advanced search</h2>
                <button
                  aria-label="Close search"
                  className="flex size-9 cursor-pointer items-center justify-center rounded-md hover:bg-gray-100"
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
                  <IoSearchOutline className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search anything..."
                    className="w-full rounded-md border py-3 pr-3 pl-10 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </form>

              {/* Content Container */}
              <div className="max-h-[65vh] space-y-5 overflow-y-auto">
                {/* Suggested Results */}
                <div>
                  <h3 className="mb-3 text-sm font-medium text-gray-500">Suggested results</h3>
                  <ul className="space-y-2">
                    {suggestedResults.map((result, index) => (
                      <li key={index} className="cursor-pointer rounded-md p-2 hover:bg-gray-100">
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Search History */}
                <div>
                  <h3 className="mb-3 text-sm font-medium text-gray-500">History</h3>
                  <ul className="space-y-2">
                    {searchHistory.map((item, index) => (
                      <li key={index} className="cursor-pointer rounded-md p-2 hover:bg-gray-100">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Featured Products */}
                <div>
                  <h3 className="mb-3 text-sm font-medium text-gray-500">Featured products</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {featuredProducts.map((product, index) => (
                      <div key={index} className="rounded-lg border p-4 hover:shadow-md">
                        <div className="mb-2 h-40 bg-gray-100"></div>
                        <h4 className="font-medium">{product.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-yellow-500">★ {product.rating}</span>
                          <span className="font-semibold">${product.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Categories */}
                <div>
                  <h3 className="mb-3 text-sm font-medium text-gray-500">All categories</h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className="rounded-md border p-2 text-left hover:bg-gray-50"
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

export default Search;
