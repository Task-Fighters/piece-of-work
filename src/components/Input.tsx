import { BiSearch } from 'react-icons/bi';
import { FiChevronDown } from 'react-icons/fi';

interface InputProps {
  label?: string;
  icon?: Boolean;
  select?: Boolean;
  placeholder?: string;
  onChange?: () => void;
}

const BASE =
  'w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600 mb-4';

export const Input = ({
  label,
  icon,
  select,
  placeholder,
  ...props
}: InputProps) => {
  return (
    <>
      <label className="text-pink-600 text-lg font-bold font-sans">
        {label}
      </label>
      {select ? (
        <div className="inline-block relative w-full">
          <select className={`${BASE} appearance-none`}>
            <option></option>
          </select>
          <FiChevronDown className="absolute inset-y-3 right-2 text-pink-600" />
        </div>
      ) : (
        <div className="inline-block relative w-full">
          <input type="text" className={BASE} placeholder={placeholder} />
          {icon && (
            <BiSearch className="absolute inset-y-3 right-2 text-gray-500" />
          )}
        </div>
      )}
    </>
  );
};
