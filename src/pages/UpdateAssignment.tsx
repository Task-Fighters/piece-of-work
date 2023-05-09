import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { ContextType} from '../types';
import Title from '../components/Title';
import { Input } from '../components/Input';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import Datepicker from '../components/Datepicker';
import ReactQuill from 'react-quill';


const UpdateAssignment = () => {
  const { user, groups } = useContext(AppContext) as ContextType;
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState('');
  const selectOptions = groups.map((item) => ({
    label: item.name,
    value: item.id
  }));
  const [selectedGroups, setSelectedGroups] = useState(selectOptions);
  const cookieToken: string | undefined = Cookies.get('token');
  let { assignmentId } = useParams();
  let location = useLocation().pathname.toLowerCase();
  console.log(title)

  useEffect(() => {
    axios
      .get(
        `https://project-salty-backend.azurewebsites.net/Assignments/${assignmentId}`,
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'text/plain'
          }
        }
      )
      .then((response) => {
        console.log(response.data.startDate);
        // const date = moment(response.data.startDate);
        // console.log(date)
        setTitle(response.data.title);
        // setStartDate(date);
        setDescription(response.data.description);
      });

  }, [assignmentId, cookieToken]);

  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl mx-2 w-full">
          <form>
            <Title underline title="Update Assignment" />
            <Input label="Title"  onChange={(e) => setTitle(e.target.value)}
              value={title} />
            <Datepicker  value={startDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStartDate(e.target.value)
              }/>
            <Input options={groups} select label="Group" />
            <label className="text-pink-600 text-lg font-bold font-sans">
              Details
            </label>
            <ReactQuill
              className="h-44 mb-14"
              theme="snow"
              value={description}
              onChange={(e) => setDescription(e)}
            />
            <div>
              <Button label="Update Assignment" type="button" />
            </div>
            <div className="mb-32">
              <Button
                buttonColor="pink"
                label="Delete Assignment"
                type="button"
              />
            </div>
          </form>
        </div>
        <Footer role={user.role} image={user.imageUrl} />
      </div>
    </div>
  );
};

export default UpdateAssignment;
