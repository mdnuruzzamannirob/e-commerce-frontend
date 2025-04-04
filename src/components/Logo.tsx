'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const Logo = ({ className = '' }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Image
      onClick={() => pathname !== '/' && router.push('/')}
      src="/THE_ONE_DARK.png"
      alt="logo"
      width={72}
      height={36}
      className={cn('cursor-pointer rounded-md object-cover dark:invert', className)}
    />
  );
};

export default Logo;
