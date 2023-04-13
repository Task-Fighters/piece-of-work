import React from "react";
// import { Link } from 'react-router-dom';
export interface NavItem {
  label: string;
}

interface HeaderProps {
  navItems: NavItem[];

  onClick?: () => void;
}

const baseHeader =
  "cursor-pointer rounded border-4 font-bold leading-none inline-block font-sans text-sm px-4 py-4 w-full";

export const Header = ({ navItems, onClick }: HeaderProps) => {
  let mode = "fixed text-white border-black bg-black";

  const classes = `${baseHeader} ${mode}`;

//   const itemsClass ='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ';

const itemsClass = 'flex '

//flex-row md:p-0 mt-4  items-end justify-between mx-auto p-4

const ulClass = '';
  return (
    <header className={classes} onClick={onClick}>
      <nav>
        <div >
        <ul className={itemsClass} >
          {navItems.map((item) => (
            <div>{item.label}</div>
          ))}
        </ul>
        </div>
      </nav>
    </header>
  );
};
