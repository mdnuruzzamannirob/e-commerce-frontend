import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

const Search = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setSearchOpen(false);
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
    <div ref={dropdownRef}>
      <button
        className={cn(
          'relative flex size-9 cursor-pointer items-center justify-center gap-2 rounded-md transition-colors',
          searchOpen
            ? 'bg-gray-100 text-blue-500 hover:bg-gray-200'
            : 'hover:bg-gray-100 hover:text-blue-500',
        )}
        onClick={() => setSearchOpen(!searchOpen)}
      >
        <IoSearchOutline className="size-5" />
      </button>

      {searchOpen && (
        <>
          <div
            onClick={() => setSearchOpen(false)}
            className="fixed top-0 left-0 z-50 size-full bg-black/50"
          />
          <div className="fixed top-1/2 left-1/2 z-50 min-h-10/12 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-5 shadow-sm">
            <div className="mx-10 size-full"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
