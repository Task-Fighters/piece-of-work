import React from "react";
// import { Link } from 'react-router-dom';
export interface NavItem {
  label: string;

}
export 
interface HeaderProps {
    items: { label: string; href: string }[];
}

const baseHeader =
  "cursor-pointer rounded border-4 font-bold leading-none inline-block font-sans text-sm px-4 py-2 h-430 w-full";

export const Header = ({ items}: HeaderProps) => {
  let mode = "fixed text-white  bg-neutral-700";
  const headerClasses = `${baseHeader} ${mode}`;
  const itemsClass = "flex flex-row  mt-10 justify-end my-0";
  const liClass = "font-normal mx-2 bottom-0 text-xs";

  return (
    <header className={headerClasses}>
      <nav>
        <ul className={itemsClass}>
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
