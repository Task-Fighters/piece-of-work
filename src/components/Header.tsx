import React from 'react';
import whiteLogo from '../assets/Saltwhite.svg';
import blackLogo from '../assets/Saltblack.svg';
// import { MdEdit, MdAddCircleOutline } from 'react-icons/md';

interface HeaderProps {
  role: string;
  location: string;
}

const baseHeader = 'text-white mb-4 flex md:bg-neutral-700 justify-center';

export const Header = ({ role, location }: HeaderProps) => {
  const adminMenu = [
    { label: 'Home', href: '/home' },
    { label: 'Groups', href: '/groups' },
    { label: 'Users', href: '/users' },
    { label: 'Assignments', href: '/assignments' },
    { label: 'Profile', href: '/profile' }
  ];

  const pgpMenu = [
    { label: 'Home', href: '/home' },
    { label: 'Users', href: '/users' },
    { label: 'Profile', href: '/profile' }
  ];

  const items = role === 'admin' ? adminMenu : pgpMenu;

  const ulClass = 'flex my-2';
  const liClass = 'font-poppins mx-2 bottom-0 text-base';
  const liClassSelected =
    'font-poppins mx-2 bottom-0 text-base border-b-[2px] border-pink-600';
  return (
    <header className={baseHeader}>
      <div className="flex flex-wrap justify-between w-full max-w-6xl items-end mx-2 h-36">
        <div className="w-52 m-5 hidden md:flex">
          <img src={whiteLogo} alt="Salt logo" />
        </div>
        <div>
          <div className="w-36 m-5 flex md:hidden">
            <img src={blackLogo} alt="Salt logo" />
          </div>

          <nav className="hidden md:flex">
            <ul className={ulClass}>
              {items?.map((item) => (
                <li
                  className={
                    location.includes(item.href) ? liClassSelected : liClass
                  }
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
