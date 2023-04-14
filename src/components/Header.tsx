import React from 'react';
import darkLogo from '../assets/Saltwhite.svg';

export interface HeaderProps {
  items: { label: string; href: string }[];
}

const baseHeader = 'flex justify-between text-white bg-neutral-700';

export const Header = ({ items }: HeaderProps) => {
  const ulClass = 'flex my-2';
  const liClass = 'font-normal mx-2 bottom-0 text-lg';

  return (
    <header className={baseHeader}>
      <div className="w-60 m-5">
        <img src={darkLogo} alt="Salt logo" />
      </div>
      <nav className="flex items-end">
        <ul className={ulClass}>
          {items.map((item) => (
            <li className={liClass} key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
