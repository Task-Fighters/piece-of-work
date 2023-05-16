import { BiSearch } from 'react-icons/bi';
import { IGroup, IRole, ILocation } from '../types';
import { Select, initTE } from 'tw-elements';
import { useEffect } from 'react';
interface InputProps {
  label?: string;
  icon?: Boolean;
  select?: Boolean;
  multiple?: Boolean;
  date?: Boolean;
  placeholder?: string;
  disabled?: Boolean;
  value?: any;
  options?: IGroup[] | IRole[] | ILocation[];
  onChange?: (e: any) => void;
}

const BASE =
  'w-full rounded border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-pink-600 mb-4';

export const Input = ({
  label,
  icon,
  select,
  date,
  placeholder,
  disabled,
  multiple,
  onChange,
  value,
  options,
  ...props
}: InputProps) => {
  useEffect(() => {
    initTE({ Select });
  }, []);

  return (
    <>
      <label className="text-pink-600 text-lg font-bold font-sans">
        {label}
      </label>
      {disabled ? (
        // <div className="inline-block relative w-full focus-within:outline-none focus-within:ring-1 focus-within:ring-pink-600 mb-4">
        //   {multiple ? (
        //     <select 
        //       data-te-select-init
        //       data-te-select-placeholder="Select option"
        //       multiple
        //       data-te-select-size="lg"
        //       onChange={onChange}
        //     >
        //       {options?.map((option) => {
        //         return (
        //           <option key={option.id} value={option.name}>
        //             {option.name}
        //           </option>
        //         );
        //       })}
        //     </select>
        //   ) : (
        //     <select
        //       data-te-select-init
        //       data-te-select-placeholder="Select option"
        //       data-te-select-size="lg"
        //       onChange={onChange}     
        //       >
        //       {options?.map((option) => {
        //         return (
        //           <option
        //             key={`${option.name} ${option.id}`}
        //             value={label !== 'group' ? option.name : option.id}
        //           >
        //             {option.name}
        //           </option>
        //         );
        //       })}
        //     </select>
        //   )}
        // </div>
        <div className="inline-block relative w-full">
          <input
            type={date ? 'date' : 'text'}
            className={BASE}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            required
            disabled
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
            required
          />
          {icon && (
            <BiSearch className="absolute inset-y-2.5 right-2 text-gray-500 text-2xl"/>
          )}
        </div>
      )}
    </>
  );
};