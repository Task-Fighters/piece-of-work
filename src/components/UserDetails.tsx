import { MdLocationPin } from 'react-icons/md';
import Title from '../components/Title';

interface UserDetailsProps {
  id: number;
  name: string;
  email: string;
  imageURL?: string;
  location?: string;
  groups?: string[];
}
const baseIcon = 'text-lg text-pink-600 mr-1';

const UserDetails = ({
  id,
  name,
  email,
  imageURL = 'https://lh3.googleusercontent.com/a/AGNmyxakun_wyuFnicLeqrIfZW766lP5xL0wP_OK-pm3vQ=s576',
  location = 'Amsterdam',
  groups
}: UserDetailsProps) => {
  return (
    <div className="max-w-6xl bg-pink-600 bg-opacity-10 mb-4 px-4 pb-3 py-2 relative">
      <div className="border-b-2 border-pink-600 pb-0 mr-6 mb-1">
        <p className="text-sm text-pink-600 mb-1 mt-1 font-bold font-poppins">
          JSFS Fall 2022
        </p>
      </div>
      <div>
        <p className="text-2xl font-bold font-poppins">{name} </p>
        <p className="text-sm font-roboto">{email}</p>
        <div className="flex justify-start mt-1">
          <MdLocationPin className={`${baseIcon}`} />
          <p className="text-sm font-bold font-roboto">{location}</p>
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <img
          src={imageURL}
          alt="Profile"
          className="rounded-full border-8 w-24 border-white outline-none outline-offset-0 outline-pink-600"
        />
      </div>
    </div>
  );
};

export default UserDetails;
