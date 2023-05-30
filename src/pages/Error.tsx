import { CgSmileSad } from 'react-icons/cg';

interface ErrorProps {
    errorCode?: number;
    text?: string;
  }

export const Error = ({
    errorCode,
    text
  }: ErrorProps) => {
  
    return  (
        <div className='flex flex-col justify-center w-full items-center'>
            <CgSmileSad className='text-gray-600 text-9xl'/> 
            <p className="text-5xl mt-6 text-pink-600">
                Something went wrong!
            </p>
        </div>
     
    )
  };
  
  export default Error;