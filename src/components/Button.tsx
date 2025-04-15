'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';
import { RiLoader3Fill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';

const buttonVariants = cva(
  'relative flex items-center select-none justify-center cursor-pointer overflow-hidden rounded-sm capitalize  transition-colors disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600',
        secondary:
          'bg-zinc-700 dark:bg-white text-white dark:text-black hover:bg-zinc-600 dark:hover:bg-white/90',
        tertiary: 'bg-transparent hover:bg-red-500/15 hover:text-red-500',
        outline:
          'border border-zinc-200 dark:border-white/15 bg-transparent hover:bg-zinc-200 dark:hover:bg-white/15',
        ghost: 'bg-transparent hover:bg-red-600 dark:text-zinc-700 hover:text-white',
        link: 'dark:text-white hover:text-red-500 hover:underline',
        success: 'bg-green-500 text-white hover:bg-green-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
      },
      size: {
        xs: 'px-2 py-0.5 text-[10px] gap-1',
        sm: 'px-3 py-1 text-xs gap-1.5',
        md: 'px-4 h-9 text-sm gap-2',
        lg: 'px-5 py-2 text-base gap-2.5',
      },
      isLoading: {
        true: 'cursor-wait',
      },
    },
    compoundVariants: [
      // Loading state overrides
      {
        variant: 'primary',
        isLoading: true,
        className: 'hover:bg-red-500',
      },
      {
        variant: 'secondary',
        isLoading: true,
        className: 'hover:bg-zinc-700 dark:hover:bg-white',
      },
      {
        variant: 'tertiary',
        isLoading: true,
        className: 'hover:bg-red-500/15 ',
      },
      {
        variant: 'outline',
        isLoading: true,
        className: 'hover:bg-transparent dark:hover:bg-transparent',
      },
      {
        variant: 'ghost',
        isLoading: true,
        className: 'hover:bg-transparent hover:text-black',
      },
      {
        variant: 'link',
        isLoading: true,
        className: 'hover:text-black hover:no-underline dark:text-white',
      },
      {
        variant: 'success',
        isLoading: true,
        className: 'hover:bg-green-500',
      },
      {
        variant: 'danger',
        isLoading: true,
        className: 'hover:bg-red-500',
      },
      {
        variant: 'warning',
        isLoading: true,
        className: 'hover:bg-yellow-500',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: ReactNode;
  isLoading?: boolean;
  href?: string;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  href,
  onClick,
  ...props
}: ButtonProps) => {
  const router = useRouter();
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; size: number; key: number }>
  >([]);
  const [rippleKey, setRippleKey] = useState(0);

  const rippleColors = {
    primary: 'bg-white',
    secondary: 'bg-white dark:bg-black',
    tertiary: 'bg-black dark:bg-white',
    outline: 'bg-zinc-700 dark:bg-white',
    ghost: 'bg-white',
    success: 'bg-white',
    danger: 'bg-white',
    warning: 'bg-white',
    link: 'bg-red-500',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const rippleSize = Math.max(rect?.width, rect?.height);
    const x = e.clientX - rect.left - rippleSize / 2;
    const y = e.clientY - rect.top - rippleSize / 2;

    setRipples((prev) => [...prev, { x, y, size: rippleSize, key: rippleKey }]);
    setRippleKey((prev) => prev + 1);

    onClick?.(e);
    if (href) {
      router.push(href);
    }
  };

  return (
    <button
      className={cn(buttonVariants({ variant, size, isLoading, className }))}
      onClick={handleClick}
      disabled={isLoading}
      {...props}
    >
      {/* Ripple Effect */}
      {ripples.map(({ x, y, size, key }) => (
        <span
          key={key}
          className={cn(
            'animate-ripple pointer-events-none absolute rounded-full',
            rippleColors[variant || 'primary'],
          )}
          style={{ top: y, left: x, width: size, height: size }}
          onAnimationEnd={() => setRipples((prev) => prev.filter((r) => r.key !== key))}
        />
      ))}

      {/* Content */}
      {isLoading ? (
        <span className="flex items-center gap-1">
          <RiLoader3Fill
            className={cn(
              'animate-spin',
              size === 'xs' && 'size-3',
              size === 'sm' && 'size-4',
              size === 'md' && 'size-5',
              size === 'lg' && 'size-6',
            )}
          />
          {children || 'Loading...'}
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export { Button, buttonVariants };
