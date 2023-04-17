import React from 'react';
import { useLocation } from 'react-router-dom';
import darkLogo from '../assets/Saltwhite.svg';

export interface HeaderProps {
  items: { label: string; href: string }[];
}

const baseHeader = 'text-white bg-neutral-700 mb-4 flex justify-center';

export const Header = ({ items }: HeaderProps) => {
  let location = useLocation().pathname.toLowerCase();
  console.log('url', location);

  const ulClass = 'flex my-2';
  const liClass = 'font-poppins mx-2 bottom-0 text-base';
  const liClassSelected =
    'font-poppins mx-2 bottom-0 text-base border-b-[2px] border-pink-600';

  return (
    <header className={baseHeader}>
      <div className="flex flex-wrap justify-between w-full max-w-6xl items-end mx-2 h-36">
        <div className="w-52 m-5">
          <img src={darkLogo} alt="Salt logo" />
        </div>
        <div>
          <nav className="flex">
            <ul className={ulClass}>
              {items.map((item) => (
                <li
                  className={location === item.href ? liClassSelected : liClass}
                  key={item.href}
                >
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
