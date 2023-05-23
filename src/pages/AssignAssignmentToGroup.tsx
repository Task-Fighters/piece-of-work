import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { ContextType, IAssignment } from '../types';
import Title from '../components/Title';
import { Input } from '../components/Input';
import { MultiSelect } from 'react-multi-select-component';
import { Button } from '../components/Button';

const AssignAssignmentToGroup = () => {
  const { groups, assignments } = useContext(
    AppContext
  ) as ContextType;
  const [assignment, setAssignment] = useState<IAssignment>({
  id: undefined,
  title: "",
  startDate: "",
  description: "",
  groupId: undefined
    
  })
  const selectOptions = groups?.map(item => {
    let option = {
      label: item.name,
      value: item.id,
      disabled: false
    }
    return option;
  } 
);

const  groupsWithCurrentAssignment:any[] = [];

assignments.forEach(item => {
  if (assignment.groupId !== undefined && assignment?.title === item?.title) {
    groupsWithCurrentAssignment.push(item.groupId);
    return;
  }
})

selectOptions.map(item => {
  if (groupsWithCurrentAssignment?.some((id) => id === item.value) ) {
    item.disabled = true ;
    return item;
   }
   return item;
})

const [selected, setSelected] = useState([]);
const selectedGroupIds = selected.map((group: { value: any; }) => group.value);

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
        setAssignment(response.data)
      })
  }, [assignmentId, cookieToken]);

  const handleAssiignAssignmentToGroup: React.FormEventHandler<HTMLFormElement> = (
    e
  ) => {
    e.preventDefault();
    selectedGroupIds.forEach(groupId => {
      let newAssignment  = {
        title: assignment.title,
        startDate: assignment.startDate,
        description: assignment.description,
        groupId: groupId
      }
      try {
        axios
        .post(
          `https://project-salty-backend.azurewebsites.net/Assignments/`,
          {
            ...newAssignment
          },
          {
            headers: {
              Authorization: `Bearer ${cookieToken}`,
              Accept: 'text/plain'
            }
          }
        )
        .then(() => {
          navigate(`/home`);
        });
      } catch(err) {
        console.log(err)
      }
    })
  };

  return (
    <>
      <form onSubmit={handleAssiignAssignmentToGroup}>
        <Title underline title="Assign Assignment to Groups" />
        <Input
          label="Title"
          disabled={true}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setAssignment({...assignment, title: e.target.value})}
          value={assignment?.title}
        />
      <label className="text-pink-600 text-lg font-bold font-sans">
        Groups        
      </label>
      <div className=".dropdown-container mb-4">
      <MultiSelect
        options={selectOptions}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
      </div>
        <div>
          <Button label="Assign to Groups" type="submit" />
        </div>
       
      </form>
    </>
  );
};

export default AssignAssignmentToGroup;