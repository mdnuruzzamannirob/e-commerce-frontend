'use client';

import { cn } from '@/lib/utils';
import { ReactNode, useState, ButtonHTMLAttributes } from 'react';
import { RiLoader3Fill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'success'
    | 'danger'
    | 'warning'
    | 'link';
  action?: 'default' | 'loading' | 'link';
  href?: string;
  className?: string;
}

const Button = ({
  children,
  size = 'md',
  variant = 'primary',
  action = 'default',
  className = '',
  href,
  onClick,
  ...restProps
}: ButtonProps) => {
  const router = useRouter();
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; size: number; key: number }>
  >([]);
  const [rippleKey, setRippleKey] = useState(0);

  // Determine ripple color based on className (or variant)
  const rippleColorClass = (() => {
    if (className.includes('bg-black')) {
      return 'bg-white';
    } else if (className.includes('bg-white')) {
      return 'bg-black';
    }
    return 'bg-white';
  })();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const rippleSize = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - rippleSize / 2;
    const y = e.clientY - rect.top - rippleSize / 2;
    const newRipple = { x, y, size: rippleSize, key: rippleKey };
    setRippleKey((prev) => prev + 1);
    setRipples((prev) => [...prev, newRipple]);

    onClick?.(e);

    if (action === 'link' && href) {
      router.push(href);
    }
  };

  const handleAnimationEnd = (key: number) => {
    setRipples((prev) => prev.filter((ripple) => ripple.key !== key));
  };

  // The inner content is the same for both a button and a link.
  const content = (
    <>
      {ripples.map((ripple) => (
        <span
          key={ripple.key}
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
          }}
          className={cn(
            'animate-ripple pointer-events-none absolute rounded-full',
            rippleColorClass,
            variant === 'secondary' && 'bg-black',
            variant === 'link' && 'bg-blue-500',
          )}
          onAnimationEnd={() => handleAnimationEnd(ripple.key)}
        />
      ))}

      {action === 'loading' ? (
        <>
          <RiLoader3Fill
            className={cn(
              'animate-spin',
              size === 'xs' && 'min-h-[14px] min-w-[14px]',
              size === 'sm' && 'min-h-4 min-w-4',
              size === 'md' && 'min-h-5 min-w-5',
              size === 'lg' && 'min-h-6 min-w-6',
              size === 'xl' && 'min-h-7 min-w-7',
            )}
          />
          {children ? children : 'Loading...'}
        </>
      ) : (
        children
      )}
    </>
  );

  // The computed class names based on props.
  const classes = cn(
    'relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full capitalize transition-colors select-none disabled:cursor-not-allowed disabled:opacity-50',
    className,
    size === 'xs' && 'gap-1 px-2 py-0.5 text-[10px]',
    size === 'sm' && 'gap-1.5 px-3 py-1 text-xs',
    size === 'md' && 'gap-2 px-4 py-2 text-sm',
    size === 'lg' && 'py-2.5 gap-2 px-5 text-base',
    size === 'xl' && 'gap-2.5 px-6 py-3 text-lg',
    variant === 'primary' && 'bg-blue-500 text-white hover:bg-blue-600 disabled:hover:bg-blue-500',
    variant === 'secondary' && 'bg-white text-black hover:bg-white/90 disabled:hover:bg-white',
    variant === 'success' &&
      'bg-green-500 text-white hover:bg-green-600 disabled:hover:bg-green-500',
    variant === 'warning' &&
      'bg-yellow-500 text-white hover:bg-yellow-600 disabled:hover:bg-yellow-500',
    variant === 'danger' && 'bg-red-500 text-white hover:bg-red-600 disabled:hover:bg-red-500',
    variant === 'ghost' &&
      'bg-transparent text-white hover:bg-blue-600 disabled:hover:bg-transparent',
    variant === 'outline' &&
      'border border-white/15 bg-transparent text-white hover:border-transparent hover:bg-white/15 disabled:hover:border-white/15 disabled:hover:bg-transparent',
    variant === 'link' &&
      'text-white transition-none hover:text-blue-500 hover:underline disabled:hover:text-white disabled:hover:no-underline',
  );

  return (
    <button {...restProps} onClick={handleClick} className={classes}>
      {content}
    </button>
  );
};

export default Button;
