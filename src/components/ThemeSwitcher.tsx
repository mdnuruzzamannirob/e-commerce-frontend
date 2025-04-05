'use client';

import { cn } from '@/lib/utils';
import { useRef, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useClickOutside } from '@/hooks/useClickOutside';
import { themeOptions } from '@/constants';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <p className="size-9 rounded-md bg-black/5 dark:bg-white/10"></p>;
  }

  // Get the current theme object, defaulting to "system"
  const currentTheme =
    themeOptions.find((option) => option.code === (theme || 'system')) || themeOptions[0];

  return (
    <div ref={dropdownRef} className="relative">
      {/* Toggle Button */}
      <button
        aria-label="Theme switcher"
        className={cn(
          'flex size-9 cursor-pointer items-center justify-center gap-2 rounded-md transition-colors',
          isOpen
            ? 'bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15'
            : 'hover:bg-black/5 dark:hover:bg-white/10',
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentTheme.icon}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-1/2 mt-1 flex w-40 min-w-0 -translate-x-1/2 flex-col gap-1 rounded-md border bg-white p-1 shadow-sm dark:bg-black">
          {themeOptions.map((option) => (
            <button
              key={option.code}
              className={cn(
                'flex size-full items-center gap-2 rounded-sm p-2 transition-colors',
                currentTheme.code === option.code
                  ? 'bg-black/5 dark:bg-white/15'
                  : 'hover:bg-black/5 dark:hover:bg-white/15',
              )}
              onClick={() => {
                setTheme(option.code);
                setIsOpen(false);
              }}
            >
              {option.icon}
              <h6>{option.name}</h6>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
