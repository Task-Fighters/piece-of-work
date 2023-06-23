import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from 'AppContext';
import { ContextType, GroupType } from 'types';
import Title from 'components/Title';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import Datepicker from 'components/Datepicker';
import ReactQuill from 'react-quill';
import moment from 'moment';
import { InputErrorAlert } from 'components/InputErrorAlert';
import { RiAsterisk } from 'react-icons/ri';
import {modules, formats} from 'components/RichTextEditor';
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
  const [group, setGroup] = useState<GroupType>({
    id: 0,
    name: '',
    users: [],
    assignmentsId: []
  });

  const [isValid, setIsValid] = useState({
    title: true,
    startDate: true,
    description: true
  });

  const [toShowValidationError, setToShowValidationError] = useState(false);

  const cookieToken: string | undefined = Cookies.get('token');
  let { assignmentId } = useParams();
  const navigate = useNavigate();
  const regexForDescription = /(?<=>)[\w\s]+(?=<)/g

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
        const date = convertDate(response.data.startDate);
        setTitle(response.data.title);
        setStartDate(date);
        group && setGroup(group);
        setDescription(response.data?.description);
      }).catch((error) => { 
        navigate("/error")
      });
      // eslint-disable-next-line
  }, [assignmentId, cookieToken, groups]);

  useEffect(() => {
    setIsValid({
      ...isValid,
      title: title ? true : false,
      startDate: startDate ? true : false,
      description: regexForDescription.test(description.replace("<br>", "")) ? true : false
    });
    // eslint-disable-next-line
  }, [title, startDate, description]);

  
  const handleUpdateAssignment: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    let updatedAssignment;
    if (
      isValid.startDate === true &&
      isValid.title === true &&
      isValid.description === true
    ) {
      updatedAssignment = {
        title: title,
        startDate: startDate,
        description: description,
        groupId: group.id
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
        .then(() => {
          navigate(`/assignments/${assignmentId}`);
        }).catch((error) => { 
          navigate("/error")
        });
    } else {
      setToShowValidationError(true);
    }
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
      .then(() => {
        setAssignments(
          assignments.filter(
            (assignment) => assignment.id !== Number(assignmentId)
          )
        );
        navigate(`/home`);
      }).catch((error) => { 
        navigate("/error")
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
          required={true}
        />
        <InputErrorAlert
          isValid={isValid.title}
          toShowValidationError={toShowValidationError}
        />
        <Datepicker
          value={startDate}
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStartDate(e.target.value)
          }
        />
        <InputErrorAlert
          isValid={isValid.startDate}
          toShowValidationError={toShowValidationError}
        />

        <Input
          label="Group"
          disabled={true}
          placeholder={group?.name}
          value={group?.name}
        />

        <label className="text-pink-600 text-lg font-bold font-sans flex items-center">
          Details <span>&nbsp;</span>{' '}
          <RiAsterisk className="text-[10px] text-red-500" />
        </label>
        <ReactQuill
          className="h-44 mb-14"
          theme="snow"
          modules={modules}
          formats={formats}
          value={description}
          onChange={(e: any) => setDescription(e)}
        />
        <InputErrorAlert
          isValid={isValid.description}
          toShowValidationError={toShowValidationError}
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
