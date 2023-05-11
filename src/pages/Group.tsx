import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, useParams } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { ContextType, IGroup } from '../types';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { ListItem } from '../components/ListItem';
import { Button } from '../components/Button';
import Editable from '../components/Editable';

const Group = () => {
  const { user } = useContext(AppContext) as ContextType;
  const [group, setGroup] = useState<IGroup>({} as IGroup);
  const [groupName, setGroupName] = useState('');
  let { groupId } = useParams();
  let location = useLocation().pathname.toLowerCase();
  const cookieToken: string | undefined = Cookies.get('token');

  useEffect(() => {
    axios
      .get(
        `https://project-salty-backend.azurewebsites.net/Groups/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'text/plain'
          }
        }
      )
      .then((response) => {
        setGroup(response.data);
        setGroupName(response.data.name);
      });
  }, [cookieToken, groupId]);

  // const handleDeleteUser = () => {
  //   axios
  //     .delete(
  //       `https://project-salty-backend.azurewebsites.net/Groups/${groupId}`
  //     )
  //     .then((response) => {
  //       setGroup(response.data);
  //       setGroupName(response.data.name);
  //     });
  // };

  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl w-full mx-2">
          <Editable text={groupName} groupId={Number(groupId)} type="input">
            <input
              type="text"
              name="task"
              value={groupName}
              className="focus:outline-none w-96"
              onChange={(e) => setGroupName(e.target.value)}
            />
          </Editable>

          <Input label="User E-mail Address" />
          <div className="mb-4">
            <Button label="Add User to Group" type="button" />
          </div>
          <ul className="flex flex-row flex-wrap justify-between capitalize">
            {group.users?.map((person) => {
              return (
                <ListItem
                  key={person?.id}
                  id={person?.id}
                  title={person?.fullName}
                  route="/users"
                  iconDelete={user.role === 'admin' ? true : false}
                />
              );
            })}
          </ul>
          <Footer role={user.role} image={user.imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default Group;
