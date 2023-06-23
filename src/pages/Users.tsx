import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from 'AppContext';
import { ContextType } from 'types';
import { Input } from 'components/Input';
import Title from 'components/Title';
import { ListItem } from 'components/ListItem';
import { Button } from 'components/Button';

const Users = () => {
  const { user, users } = useContext(AppContext) as ContextType;
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleEditUser = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/users/${id}/update`);
  };
  return (
    <>
      <div className="flex justify-end">
        {user.role === 'admin' && (
          <div className="md:w-48 md:flex xs:w-full">
            <Button
              buttonColor="white"
              label="Add User"
              type="button"
              onClick={() => {
                navigate('/users/new');
              }}
            />
          </div>
        )}
      </div>
      <Input
        icon
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Title underline title="Users" />
      <ul className="flex flex-row flex-wrap justify-between capitalize mb-32">
        {users.map((person, index) => {
          if (
            search === '' ||
            person?.fullName.toLowerCase().includes(search.toLowerCase())
          )
            return (
              <ListItem
                key={index}
                id={person?.id}
                title={person?.fullName}
                route="/users"
                iconEdit={user.role === 'pgp' ? false : true}
                onClickEditIcon={(e: any) => handleEditUser(e, person.id)}
              />
            );
          return <div key={index}></div>;
        })}
      </ul>
    </>
  );
};

export default Users;
