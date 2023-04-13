import {FiChevronDown} from "react-icons/fi";
import {BiSearch} from "react-icons/bi";
import { IconType } from 'react-icons/lib';

interface InputProps {
  label?: string;
  icon?: IconType;
  case?: 'text' | 'search' | 'select'
}

const BASE = 'w-full rounded border text-sm px-4 py-2'

const Input = ({ label, ...props}: InputProps) => {
  return (
    <>
    <label className='text-pink-600'>{label}</label>
    <div className='inline-block relative w-full'>
      <input type="text" className={BASE}/>
      {/* <FiChevronDown className='text-pink-600'/> */}
      <BiSearch className='absolute inset-y-3 right-2 text-gray-500'/>
    </div>
    </>
  )
}

export default Input;
