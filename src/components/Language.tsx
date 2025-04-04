import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: 'https://www.worldometers.info//img/flags/small/tn_us-flag.gif',
  },
  {
    code: 'bn',
    name: 'বাংলা',
    flag: 'https://www.worldometers.info//img/flags/small/tn_bg-flag.gif',
  },
];

const Language = () => {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setLanguageOpen(false);
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
          'relative flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border px-3 transition-colors',
          languageOpen
            ? 'bg-black/5 text-blue-500 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15'
            : 'hover:bg-black/5 hover:text-blue-500 dark:hover:bg-white/10',
        )}
        onClick={() => setLanguageOpen(!languageOpen)}
      >
        <Image
          src={selectedLanguage?.flag}
          alt={selectedLanguage?.name}
          width={20}
          height={15}
          className=""
        />
        <span className="text-sm uppercase">{selectedLanguage?.code}</span>
      </button>

      {languageOpen && (
        <div className="absolute top-full left-1/2 mt-1 flex w-40 min-w-0 -translate-x-1/2 flex-col gap-1 rounded-md border bg-white p-1 shadow-sm dark:bg-black">
          {languages.map((item, index) => (
            <button
              key={index}
              className={cn(
                'flex size-full items-center justify-between gap-2 rounded-sm p-2 transition-colors',
                selectedLanguage?.code === item.code
                  ? 'bg-black/5 dark:bg-white/10'
                  : 'hover:bg-black/5 dark:hover:bg-white/10',
              )}
              onClick={() => {
                setSelectedLanguage(item);
                setLanguageOpen(false);
              }}
            >
              <div className="flex items-center gap-2 text-sm">
                <Image src={item.flag} alt={item.name} width={30} height={20} className="rounded" />
                <span>{item.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Language;
