import axios from 'axios';
import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import Title from './Title';

interface EditableProps {
  text: string;
  type: string;
  groupId?: number;
  children: any;
  onClick?: () => void;
  onBlur?: () => void;
}

const Editable = ({
  text,
  type,
  groupId,
  children,
  onBlur,
  ...props
}: EditableProps) => {
  const [isEditing, setEditing] = useState(false);

  const handleUpdate = (e: React.FocusEvent<HTMLInputElement>) => {
    setEditing(false);
    axios
      .put(`https://project-salty-backend.azurewebsites.net/Groups`, {
        id: groupId,
        name: text
      })
      .then((response) => console.log('put request', response.statusText));
  };
  
  return (
    <section
      {...props}
      className="w-full flex flex-row justify-between items-center border-b-2 border-pink-600 mb-4"
    >
      {isEditing ? (
        <div onBlur={(e: any) => handleUpdate(e)}>{children}</div>
      ) : (
        <div>
          <Title title={text} className="!mb-0" />
        </div>
      )}
      <MdEdit
        className={`text-2xl text-pink-600 ${isEditing ? 'hidden' : 'block'}`}
        onClick={() => setEditing(true)}
      />
    </section>
  );
};

export default Editable;
