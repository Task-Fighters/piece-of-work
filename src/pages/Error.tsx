import Title from '../components/Title';

export const Error = () => {
    return  (
        <div className='flex flex-col justify-center w-full items-center h-[60vh]'>
            <Title
            title="Ooops!"
            className='!text-5xl text-pink-600'
            /> 
            <p className="text-3xl mt-6 text-gray-600 md:text-5xl">
                Something went wrong!
            </p>
        </div>
     
    )
  };
  
  export default Error;