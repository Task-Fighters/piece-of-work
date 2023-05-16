import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { ContextType, IGroup } from '../types';
import Title from '../components/Title';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import Datepicker from '../components/Datepicker';
import ReactQuill from 'react-quill';
import moment from 'moment';
moment().format();

const convertDate = (date: string) => {
  let initialDate = new Date(date);
  let convertedDate = moment(initialDate).format('YYYY-MM-DD');
  return convertedDate;
};

const UpdateAssignment = () => {
  const { groups, assignments, setAssignments } = useContext(
    AppContext
  ) as ContextType;
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState('');
  const [group, setGroup] = useState<IGroup>();
  const cookieToken: string | undefined = Cookies.get('token');
  let { assignmentId } = useParams();
  const navigate = useNavigate();

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
        const group = groups.find(
          (group) => group.id === response.data.groupId
        );
        console.log(group);
        const date = convertDate(response.data.startDate);
        setTitle(response.data.title);
        setStartDate(date);
        setGroup(group);
        setDescription(response.data?.description);
      });
  }, [assignmentId, cookieToken, groups]);

  const handleUpdateAssignment: React.FormEventHandler<HTMLFormElement> = (
    e
  ) => {
    e.preventDefault();
    const updatedAssignment = {
      title: title,
      startDate: startDate,
      description: description,
      groupId: group?.id
    };

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
        console.log(response.statusText, 'Result Update');
        navigate(`/assignments/${assignmentId}`);
      });
  };

  const handleDeleteAssignment = (e: React.MouseEvent<HTMLButtonElement>) => {
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
        console.log(response.statusText, 'Result Delete');
        setAssignments(
          assignments.filter(
            (assignment) => assignment.id !== Number(assignmentId)
          )
        );
        navigate(`/home`);
      });
  };

  return (
    <>
      <form onSubmit={handleUpdateAssignment}>
        <Title underline title="Update Assignment" />
        <Input
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <Datepicker
          value={startDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStartDate(e.target.value)
          }
        />

        <Input
          label="Group"
          disabled={true}
          placeholder={group?.name}
          value={group?.name}
        />

        <label className="text-pink-600 text-lg font-bold font-sans">
          Details
        </label>
        <ReactQuill
          className="h-44 mb-14"
          theme="snow"
          value={description}
          onChange={(e: any) => setDescription(e)}
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
    </>
  );
};

export default UpdateAssignment;
