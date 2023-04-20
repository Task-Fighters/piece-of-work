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
const baseIcon = 'text-xl text-pink-600';

const UserDetails = ({
  id,
  name,
  email,
  imageURL = 'https://lh3.googleusercontent.com/a/AGNmyxakun_wyuFnicLeqrIfZW766lP5xL0wP_OK-pm3vQ=s576',
  location = 'AMS',
  groups
}: UserDetailsProps) => {
  return (
    <div className="max-w-6xl bg-pink-600 bg-opacity-10 flex justify-between mb-4 px-4 py-2 relative">
      <div>
        <div>
          <Title className="text-pink-600" title="JSFS Fall 2022" />
          <Title title={name} />
          <p>{email}</p>
        </div>
        <div className="flex justify-start">
          {/* {location && <MdLocationPin className={`${baseIcon}`} />} */}
          <MdLocationPin className={`${baseIcon}`} />
          <p className="text-lg">{location}</p>
        </div>
      </div>
      <div className="bg-pink-600 h-0.5 w-screen pl-32 absolute top-10 right-10"></div>
      <div className="absolute top-4 right-4">
        <img
          src={imageURL}
          alt="Profile"
          className="rounded-full border-8 w-28 border-white outline-none outline-offset-0 outline-pink-600"
        />
      </div>
    </div>
  );
};

export default UserDetails;
