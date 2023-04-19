import { Link } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';

interface ListItemProps {
  title: string;
  route: string;
  iconDelete?: Boolean;
  iconEdit?: Boolean;
  id?: number;
  onClick?: () => void;
}

const base_listItem =
  'text-left leading-relaxed mb-4 w-full text-black bg-gray-100 py-2';

export const ListItem = ({
  id,
  iconDelete,
  iconEdit,
  title,
  onClick,
  route
}: ListItemProps) => {
  const classes = `${base_listItem} `;

  return (
    <Link to={`/${route}/${id}`} className={classes} onClick={onClick}>
      <div className="px-4 pt-1">
        <h2 className="text-xl font-bold font-poppins">{title}</h2>
        {iconDelete && <TiDeleteOutline></TiDeleteOutline>}
        {iconEdit && <MdEdit></MdEdit>}
      </div>
    </Link>
  );
};
