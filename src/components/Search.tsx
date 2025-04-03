import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';

const Search = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Advanced search</h2>
                <button
                  aria-label="Close search"
                  className="flex size-9 cursor-pointer items-center justify-center rounded-md hover:bg-gray-100"
                  onClick={() => setSearchOpen(false)}
                >
                  <IoCloseOutline className="size-5" />
                </button>
              </div>

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

              {/* Search results container */}
              <div className="max-h-[60vh] overflow-y-auto">{/* Add search results here */}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
