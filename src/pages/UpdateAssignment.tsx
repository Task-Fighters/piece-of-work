import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams,useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { ContextType} from '../types';
import Select from 'react-select';
import Title from '../components/Title';
import { Input } from '../components/Input';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import Datepicker from '../components/Datepicker';
import ReactQuill from 'react-quill';
import moment from 'moment';
moment().format();

const convertDate = (date:string) => {
    let initialDate = new Date(date);
    let convertedDate= moment(initialDate).format('YYYY-MM-DD')
    return convertedDate;
}

const UpdateAssignment = () => {
  const { user, groups, assignments, setAssignments } = useContext(AppContext) as ContextType;
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState("");
  const selectOptions = groups.map((item) => ({
    value: item.id,
    label: item.name
  }));

  console.log(selectOptions, "initial options")
  console.log(groups, "groups")
  const [selectedOption, setSelectedOption] = useState<any>(null);


  const cookieToken: string | undefined = Cookies.get('token');
  let { assignmentId } = useParams();
  let location = useLocation().pathname.toLowerCase();
  const navigate = useNavigate();
  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };

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
        console.log(selectOptions, "dasha111")

      const prevSelectedOption = selectOptions.find(option => option.value === response.data.groupId);
      const date = convertDate(response.data.startDate);
      setTitle(response.data.title);
      console.log(prevSelectedOption, "dasha")
      setStartDate(date);
      setSelectedOption({...prevSelectedOption})
      setDescription(response.data?.description);
      });
  }, [assignmentId, cookieToken]);

  const handleUpdateAssignment: React.FormEventHandler<HTMLFormElement> =(e) => {
    e.preventDefault();
      const updatedAssignment = {
      title: title,
      startDate: startDate,
      description: description,
      groupId: selectedOption.value,
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
        console.log(response.statusText, "Result Update")
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
        console.log(response.statusText, "Result Delete")
        setAssignments(assignments.filter(assignment => assignment.id !== Number(assignmentId)));
        navigate(`/home`);
      }
  )}


  console.log(selectedOption, "options ")
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
            <div className=".dropdown-container">
              <label className="text-pink-600 text-lg font-bold font-sans">
              Group
            </label>
            <Select
            // defaultValue={selectedOption}
            onChange={handleChange}
            options={selectOptions}
            value={selectedOption}
      />
            </div>
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
        </div>
        <Footer role={user.role} image={user.imageUrl} />
      </div>
    </div>
  );
};

export default UpdateAssignment;

