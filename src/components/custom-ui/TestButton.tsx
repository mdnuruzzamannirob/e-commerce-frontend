'use client';

import React, { useState } from 'react';

export interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, onClick, ...rest }) => {
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; size: number; key: number }>
  >([]);
  const [rippleKey, setRippleKey] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const newRipple = { x, y, size, key: rippleKey };
    setRippleKey((prev) => prev + 1);
    setRipples((prev) => [...prev, newRipple]);

    if (onClick) {
      onClick(e);
    }
  };

  const handleAnimationEnd = (key: number) => {
    setRipples((prev) => prev.filter((ripple) => ripple.key !== key));
  };

  return (
    <button
      {...rest}
      onClick={handleClick}
      className="relative flex items-center justify-center gap-1 overflow-hidden rounded-full bg-blue-500 px-6 py-3 text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none"
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
          className="animate-ripple pointer-events-none absolute rounded-full bg-white"
          onAnimationEnd={() => handleAnimationEnd(ripple.key)}
        />
      ))}
      {children}
    </button>
  );
};

export default AnimatedButton;
