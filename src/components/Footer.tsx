import { useContext } from 'react';
import {
  MdArticle,
  MdHome,
  MdAddCircleOutline,
  MdPerson2
} from 'react-icons/md';
import { AppContext } from '../AppContext';
import { ContextType } from '../types';

const baseFooter =
  'fixed bottom-0 left-0 z-20 bg-white border-t-[1px] border-solid border-black w-full w-full py-6 px-8 flex';
const baseLink = 'flex items-center';
const baseListItem = 'hover:drop-shadow-lg';
const baseIcon = 'text-2xl';

export const Footer = () => {
  const { user } = useContext(AppContext) as ContextType;

  let mode = user.role === 'admin' ? 'flex' : 'hidden';

  return (
    <div className={`${baseFooter} md:hidden`}>
      <ul className="flex items-center justify-between w-full font-medium text-pink-600">
        <li className={`${baseListItem}`}>
          <a href="/assignments" className={`mr-4  ${baseLink}`}>
            <MdArticle className={`${baseIcon}`} />
          </a>
        </li>
        <li className={`${baseListItem}`}>
          <a href="/home" className={`mr-4  ${baseLink}`}>
            <MdHome className={`${baseIcon}`} />
          </a>
        </li>

        <li className={`${mode} ${baseListItem}`}>
          <a href="/add_assignment" className={`mr-4  ${baseLink}`}>
            <MdAddCircleOutline className={`${baseIcon}`} />
          </a>
        </li>
        <li className={`${baseListItem}`}>
          <a href="/profile" className={`${baseLink}`}>
            {user.imageURL === '' || user.imageURL === null ? (
              <MdPerson2 className={`${baseIcon}`} />
            ) : (
              <img
                src={`${user.imageURL}`}
                alt="Profile"
                className="rounded-full object-cover w-6 h-6"
              ></img>
            )}
          </a>
        </li>
      </ul>
    </div>
  );
};
