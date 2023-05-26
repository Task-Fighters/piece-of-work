import { RiAlertFill } from 'react-icons/ri';

interface InputErrorAlertProps {
  isValid: Boolean;
  toShowValidationError: Boolean;
}

export const InputErrorAlert = ({
  isValid,
  toShowValidationError
}: InputErrorAlertProps) => {

  return  (
    <p className={isValid === false && toShowValidationError === true ? "text-[12px] flex font-sans text-red-500 items-center -mt-2 mb-4 transition ease-in-out delay-150 visible;" : "invisible -mt-4 mb-0 text-[0px] transition ease-in-out delay-150"}>  
          <RiAlertFill className='text-lg text-red-500'/> 
          <span>&nbsp;</span> Please fill in the required field
    </p>
  )
};
