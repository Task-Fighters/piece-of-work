import { BiSearch } from 'react-icons/bi';
import { IGroup } from '../types';
import { Select, initTE } from 'tw-elements';
import { useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
interface InputProps {
  label?: string;
  icon?: Boolean;
  select?: Boolean;
  placeholder?: string;
  options?: IGroup[];
  onChange?: () => void;
}

const BASE =
  'w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600 mb-4';

export const Input = ({
  label,
  icon,
  select,
  placeholder,
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
      {select ? (
        <div className="inline-block relative w-full mb-4">
          <select
            data-te-select-init
            data-te-select-placeholder="Select group"
            multiple
            data-te-select-size="lg"
            data-te-class-form-outline="relative focus:border-pink-600"
            // data-te-select-form-outline-ref="focus:outline-none focus:ring-2 focus:border-pink-600"
            className={BASE}
          >
            {options?.map((option) => {
              return (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              );
            })}
          </select>
        </div>
      ) : (
        <div className="inline-block relative w-full">
          <input type="text" className={BASE} placeholder={placeholder} />
          {icon && (
            <BiSearch className="absolute inset-y-2.5 right-2 text-gray-500 text-2xl" />
          )}
        </div>
      )}
    </>
  );
};
