import React from 'react';

interface ButtonProps {
  primaryBgColor?: boolean;
  buttonColor?: 'text-black' | 'text-pink' | 'text-white';
  label: string;
  onClick?: () => void;
}

const BASE_BUTTON_CLASSES =
  'cursor-pointer rounded-sm border-2 font-bold leading-none inline-block';

export const Button = ({
  label,
  ...props
}: ButtonProps) => {
  const mode = primaryBgColor ? 'bg-black text-white' : 'bg-white';
  return (
    <button
      type="button"
      className={`${BASE_BUTTON_CLASSES} ${mode}`}  
      // style={{ tex }}
      {...props}
    >
      {label}
    </button>
  );
};
