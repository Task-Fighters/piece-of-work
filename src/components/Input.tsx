import { BiSearch } from 'react-icons/bi';
import { IGroup, IRole, ILocation } from '../types';
import { Select, initTE } from 'tw-elements';
import { useEffect } from 'react';
import { RiAsterisk } from 'react-icons/ri';
interface InputProps {
  label?: string;
  icon?: Boolean;
  select?: Boolean;
  multiple?: Boolean;
  date?: Boolean;
  placeholder?: string;
  disabled?: Boolean;
  required? :Boolean;
  defaultValue?: any;
  value?: any;
  options?: IGroup[] | IRole[] | ILocation[];
  onChange?: (e: any) => void;
}

const BASE =
  `w-full rounded border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-pink-600 mb-4`;

export const Input = ({
  label,
  icon,
  select,
  date,
  placeholder,
  disabled,
  required,
  multiple,
  onChange,
  defaultValue,
  value,
  options,
  ...props
}: InputProps) => {
  useEffect(() => {
    initTE({ Select });
  }, []);

  return (
    <>
      <label className="text-pink-600 text-lg font-bold font-sans flex items-center">
        {label} {required && <span>&nbsp;</span>} {required ? <RiAsterisk className='text-[10px] text-red-500'/> : ""}
      </label>
      {disabled ? (
        <div className="inline-block relative w-full">
          <input
            type={date ? 'date' : 'text'}
            className={BASE}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            disabled
            defaultValue={defaultValue}
          />
          {icon && (
            <BiSearch className="absolute inset-y-2.5 right-2 text-gray-500 text-2xl"/>
          )}
        </div>
      ) : (
        <div className="inline-block relative w-full">
          <input
            type={date ? 'date' : 'text'}
            className={BASE}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          />
          {icon && (
            <BiSearch className="absolute inset-y-2.5 right-2 text-gray-500 text-2xl"/>
          )}
        </div>
      )}
    </>
  );
};