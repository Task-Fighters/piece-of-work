import { Link } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';

interface ListItemProps {
  title: string;
  route: string;
  iconDelete?: Boolean;
  iconEdit?: Boolean;
  id?: number;
  onClick?: (e: any) => void;
  onClickDeleteIcon?: (e: any) => void;
}

const base_listItem =
  'text-left leading-relaxed mb-2 w-full text-black bg-gray-100 py-2 md:w-129';

export const ListItem = ({
  id,
  iconDelete,
  iconEdit,
  title,
  onClick,
  onClickDeleteIcon,
  route
}: ListItemProps) => {
  const classes = `${base_listItem}`;

  return (
    <li className={classes}>
      <Link to={`${route}/${id}`} onClick={onClick}>
        <div className="px-4 flex justify-between">
          <h2 className="text-md font-normal font-poppins">{title}</h2>
          {iconDelete && (
            <TiDeleteOutline
              className={'text-2xl text-neutral-400'}
              onClick={onClickDeleteIcon}
            />
          )}
          {iconEdit && <MdEdit className={'text-2xl text-neutral-400'} />}
        </div>
      </Link>
    </li>
  );
};
