import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { ContextType, AssignmentType } from '../types';
import Title from '../components/Title';
import { Input } from '../components/Input';
import { MultiSelect } from 'react-multi-select-component';
import { Button } from '../components/Button';
import { RiAsterisk } from 'react-icons/ri';
import { InputErrorAlert } from '../components/InputErrorAlert';

const AssignAssignmentToGroup = () => {
  const { groups, assignments, setAssignments } = useContext(
    AppContext
  ) as ContextType;
  const [assignment, setAssignment] = useState<AssignmentType>({
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

const  [groupsWithCurrentAssignment, setGroupsWithCurrentAssignment] = useState<number[]>([]);

selectOptions.map(item => {
  if (groupsWithCurrentAssignment?.some((id: number) => id === item.value) ) {
    item.disabled = true ;
    return item;
   }
   return item;
})

const [selected, setSelected] = useState([]);
const selectedGroupIds = selected.map((group: { value: any; }) => group.value);

const [isValid, setIsValid] = useState({
  groups: false,
});
const [toShowValidationError, setToShowValidationError] = useState(false)

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

      }).catch((error) => { 
        navigate("/error")
      });
      // eslint-disable-next-line
  }, [assignmentId, cookieToken]);


  useEffect(() => {
    const groupsWithCurAssignment: (any)[] = [];
    assignments.forEach(item => {
      if (assignment.groupId !== undefined && assignment?.title === item?.title) {
        groupsWithCurAssignment.push(item.groupId);
        return;
      }}
    )
   setGroupsWithCurrentAssignment(groupsWithCurAssignment)
      // eslint-disable-next-line
  },[assignments, assignment])

  useEffect(() => {
    setIsValid({...isValid, 
      groups: selected.length > 0 ? true : false,
    });
    // eslint-disable-next-line
  }, [selected]);

  const handleAssiignAssignmentToGroup: React.FormEventHandler<HTMLFormElement> = (
    e
  ) => {
    e.preventDefault();
    if(isValid.groups === true ) {
    selectedGroupIds.forEach(groupId => {
      let newAssignment  = {
        title: assignment.title,
        startDate: assignment.startDate,
        description: assignment.description,
        groupId: groupId
      }
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
        .then((response) => {
          setAssignments([...assignments, response.data])
          navigate(`/home`);
        }).catch((error) => { 
          navigate("/error")
        });
    })
  } else {
    setToShowValidationError(true)

  }
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
      <label className="text-pink-600 text-lg font-bold font-sans flex items-center">
        Groups  <span>&nbsp;</span> <RiAsterisk className='text-[10px] text-red-500'/>      
      </label>
      <div className=".dropdown-container mb-4">
      <MultiSelect
        options={selectOptions}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
      </div>
      <InputErrorAlert
      isValid={isValid.groups}
      toShowValidationError={toShowValidationError}
      />
        <div>
          <Button label="Assign to Groups" type="submit" />
        </div>
       
      </form>
    </>
  );
};

export default AssignAssignmentToGroup;
