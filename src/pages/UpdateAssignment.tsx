import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams,useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { ContextType} from '../types';
import Title from '../components/Title';
import { Input } from '../components/Input';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import Datepicker from '../components/Datepicker';
import ReactQuill from 'react-quill';
import moment from 'moment';
moment().format();

const UpdateAssignment = () => {
  const { user, groups, assignments, setAssignments } = useContext(AppContext) as ContextType;
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState('');
  // let selectOptions = groups.map((item) => ({
  //   label: item.name,
  //   value: item.id
  // }));
  const [selectedGroups, setSelectedGroups] = useState<any>({});
  const cookieToken: string | undefined = Cookies.get('token');
  let { assignmentId } = useParams();
  let location = useLocation().pathname.toLowerCase();
  const navigate = useNavigate();

  const convertDate = (date:string) => {
    let initialDate = new Date(date);
    let convertedDate= moment(initialDate).format('YYYY-MM-DD')
    return convertedDate;
  }

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
        const date = convertDate(response.data.startDate);
        setTitle(response.data.title);
        setStartDate(date);
        const selectedGroup = groups.find(group => group.id === response.data.groupId)
        
        const option = {
          label: selectedGroup?.name,
          value: selectedGroup?.id
        }
        setSelectedGroups({...option})
        setDescription(response.data.description);
      });

  }, [assignmentId, cookieToken]);

  const handleUpdateAssignment: React.FormEventHandler<HTMLFormElement> =(e) => {
    e.preventDefault();
      const updatedAssignment = {
      title: title,
      startDate: startDate,
      description: description,
      groupId: selectedGroups.value
    };

    console.log(updatedAssignment, "new updated ass")
    axios
      .put(
        `https://project-salty-backend.azurewebsites.net/Assignments/${assignmentId}`,
        {
          ...updatedAssignment
        },
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'text/plain'
          }
        }
      )
      .then((response) => {
        console.log(response.statusText, "Result")
        navigate(`/assignments/${assignmentId}`);
      }
  )}

  const handleDeleteAssignment=(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .delete(
        `https://project-salty-backend.azurewebsites.net/Assignments/${assignmentId}`,
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'text/plain'
          }
        }
      )
      .then((response) => {
        console.log(response.statusText, "Result")
        setAssignments(assignments.filter(assignment => assignment.id !== Number(assignmentId)));
        navigate(`/home`);
      }
  )}


  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl mx-2 w-full">
          <form onSubmit={handleUpdateAssignment}>
            <Title underline title="Update Assignment" />
            <Input label="Title"  onChange={(e) => setTitle(e.target.value)}
              value={title} />
            <Datepicker  value={startDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStartDate(e.target.value)
              }/>
            <Input options={groups} select label="Group"/>
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
              <Button label="Update Assignment" type="submit" />
            </div>
            <div className="mb-32">
              <Button
                buttonColor="pink"
                label="Delete Assignment"
                type="button"
                onClick={handleDeleteAssignment}
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
