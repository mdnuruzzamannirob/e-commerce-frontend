import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { BsMoonStars, BsSun, BsDisplay } from 'react-icons/bs';
import { useClickOutside } from '@/hooks/useClickOutside';

const themeOptions = [
  {
    code: 'system',
    name: 'System',
    icon: <BsDisplay className="size-5" />,
  },
  {
    code: 'light',
    name: 'Light',
    icon: <BsSun className="size-5" />,
  },
  {
    code: 'dark',
    name: 'Dark',
    icon: <BsMoonStars className="size-5" />,
  },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Custom hook for click outside detection
  useClickOutside(dropdownRef, () => setIsOpen(false));

  // Find current theme object
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
                'flex size-full items-center gap-2 rounded-sm p-2 text-sm transition-colors',
                currentTheme?.code === option.code
                  ? 'bg-black/5 dark:bg-white/15'
                  : 'hover:bg-black/5 dark:hover:bg-white/15',
              )}
              onClick={() => {
                setTheme(option.code);
                setIsOpen(false);
              }}
            >
              {option.icon}
              <span>{option.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
