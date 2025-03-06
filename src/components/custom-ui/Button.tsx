'use client';

import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';
import { RiLoader3Fill } from 'react-icons/ri';

interface ButtonProps {
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'danger' | 'warning';
  condition?: 'default' | 'loading' | 'disabled' | 'active' | 'link';
  color?: '';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  type = 'button',
  size = 'lg',
  variant = 'ghost',
  condition = 'default',
  className = '',
  onClick,
  ...restProps
}: ButtonProps) => {
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; size: number; key: number }>
  >([]);
  const [rippleKey, setRippleKey] = useState(0);

  // Determine ripple color based on background classes in the button's className
  const rippleColorClass = (() => {
    if (className.includes('bg-black')) {
      return 'bg-white';
    } else if (className.includes('bg-white')) {
      return 'bg-black';
    }
    // Default ripple color if no explicit bg is provided
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
  };

  const handleAnimationEnd = (key: number) => {
    setRipples((prev) => prev.filter((ripple) => ripple.key !== key));
  };

  switch (condition) {
    case 'default':
      return (
        <button
          type={type}
          {...restProps}
          onClick={handleClick}
          className={cn(
            'relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full border-transparent bg-blue-500 text-white transition-colors hover:bg-blue-600',
            className,
            size === 'xs' && 'gap-1 px-2 py-0.5 text-[10px]',
            size === 'sm' && 'gap-1.5 px-3 py-1 text-xs',
            size === 'md' && 'gap-2 px-4 py-1.5 text-sm',
            size === 'lg' && 'gap-2 px-5 py-2 text-base',
            size === 'xl' && 'gap-2.5 px-6 py-2.5 text-lg',
            variant === 'secondary' && 'bg-white text-black hover:bg-white/90',
            variant === 'outline' &&
              'border border-white/15 bg-transparent text-white hover:border-transparent hover:bg-white/15',
            variant === 'ghost' && 'bg-transparent text-white hover:bg-blue-600',
          )}
        >
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
              )}
              onAnimationEnd={() => handleAnimationEnd(ripple.key)}
            />
          ))}
          {children}
        </button>
      );
    case 'loading':
      return (
        <button
          type={type}
          {...restProps}
          onClick={handleClick}
          className={cn(
            'relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full border-transparent bg-blue-500 text-white transition-colors',
            className,
            size === 'xs' && 'gap-1 px-2 py-0.5 text-[10px]',
            size === 'sm' && 'gap-1.5 px-3 py-1 text-xs',
            size === 'md' && 'gap-2 px-4 py-1.5 text-sm',
            size === 'lg' && 'gap-2 px-5 py-2 text-base',
            size === 'xl' && 'gap-2.5 px-6 py-2.5 text-lg',
            variant === 'secondary' && 'bg-white text-black',
            variant === 'outline' && 'border border-white/15 bg-transparent text-white',
            variant === 'ghost' && 'bg-transparent text-white',
          )}
        >
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
              )}
              onAnimationEnd={() => handleAnimationEnd(ripple.key)}
            />
          ))}
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
        </button>
      );
    case 'disabled':
      return (
        <button
          type={type}
          {...restProps}
          onClick={handleClick}
          className={cn(
            'relative flex items-center justify-center overflow-hidden rounded-full border-transparent bg-blue-500 text-white transition-colors hover:bg-blue-600',
            className,
            size === 'xs' && 'gap-1 px-2 py-0.5 text-[10px]',
            size === 'sm' && 'gap-1.5 px-3 py-1 text-xs',
            size === 'md' && 'gap-2 px-4 py-1.5 text-sm',
            size === 'lg' && 'gap-2 px-5 py-2 text-base',
            size === 'xl' && 'gap-2.5 px-6 py-2.5 text-lg',
            variant === 'secondary' && 'bg-white text-black hover:bg-white/90',
            variant === 'outline' &&
              'border border-white/15 bg-transparent text-white hover:border-transparent hover:bg-white/15',
            variant === 'ghost' && 'bg-transparent text-white hover:bg-blue-600',
          )}
        >
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
              )}
              onAnimationEnd={() => handleAnimationEnd(ripple.key)}
            />
          ))}
          {children}
        </button>
      );
    case 'active':
      return (
        <button
          type={type}
          {...restProps}
          onClick={handleClick}
          className={cn(
            'relative flex items-center justify-center overflow-hidden rounded-full border-transparent bg-blue-600 text-white transition-colors',
            className,
            size === 'xs' && 'gap-1 px-2 py-0.5 text-[10px]',
            size === 'sm' && 'gap-1.5 px-3 py-1 text-xs',
            size === 'md' && 'gap-2 px-4 py-1.5 text-sm',
            size === 'lg' && 'gap-2 px-5 py-2 text-base',
            size === 'xl' && 'gap-2.5 px-6 py-2.5 text-lg',
            variant === 'secondary' && 'bg-white/90 text-black',
            variant === 'outline' && 'bg-white/15 text-white',
          )}
        >
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
              )}
              onAnimationEnd={() => handleAnimationEnd(ripple.key)}
            />
          ))}
          {children}
        </button>
      );
    case 'link':
      return (
        <button
          type={type}
          {...restProps}
          onClick={handleClick}
          className={cn(
            'relative flex items-center justify-center overflow-hidden rounded-full border-transparent bg-blue-500 text-white transition-colors hover:bg-blue-600',
            className,
            size === 'xs' && 'gap-1 px-2 py-0.5 text-[10px]',
            size === 'sm' && 'gap-1.5 px-3 py-1 text-xs',
            size === 'md' && 'gap-2 px-4 py-1.5 text-sm',
            size === 'lg' && 'gap-2 px-5 py-2 text-base',
            size === 'xl' && 'gap-2.5 px-6 py-2.5 text-lg',
            variant === 'secondary' && 'bg-white text-black hover:bg-white/90',
            variant === 'outline' &&
              'border border-white/15 bg-transparent text-white hover:border-transparent hover:bg-white/15',
            variant === 'ghost' && 'bg-transparent text-white hover:bg-blue-600',
          )}
        >
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
              )}
              onAnimationEnd={() => handleAnimationEnd(ripple.key)}
            />
          ))}
          {children}
        </button>
      );

    default:
      <></>;
  }
};

export default Button;
