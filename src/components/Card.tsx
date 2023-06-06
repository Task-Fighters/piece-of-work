import parse from 'html-react-parser';
import { MdEdit } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';

interface CardProps {
  cardType?: 'card' | 'feature' | 'detailed';
  title: string;
  id?: number;
  subtitle: string;
  description: string;
  group?: string;
  pointer?: Boolean;
  iconEdit?: Boolean;
  onClick?: (e: any) => void;
  onClickEditIcon?: (e: any) => void;
}

const base_card = 'text-left border-b-2 leading-tight mb-4 w-full';

export const Card = ({
  id,
  title,
  subtitle,
  description,
  pointer,
  group,
  iconEdit,
  cardType = 'card',
  onClickEditIcon,
  onClick
}: CardProps) => {
  const navigate = useNavigate();
  let mode = 'text-black border-black bg-gray-100';
  let featureText = description;


  
  switch (cardType) {
    case 'feature':
      mode = 'text-black border-pink-600 bg-gray-100';
      featureText =
        description.length > 300
          ? description.slice(0, 300) + '...'
          : description;
      break;
    case 'detailed':
      mode = 'text-black border-pink-600 bg-gray-100';
      featureText = description;
      break;
    case 'card':
      mode = 'text-black border-black bg-gray-100 md:w-129';
      featureText = '';
      break;
  }

  const dateObj = new Date(Date.parse(subtitle));
  const formattedDate = dateObj
    .toLocaleDateString('en-UK', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    .replace(',', '');

  subtitle = formattedDate;
  const classes = `${base_card} ${mode} py-2 ${pointer === true ? "cursor-pointer" : "cursor-auto" }`;
  const location = useLocation();

  const handleNavigate = () => {
    if(location.pathname !== `/assignments/${id}`){
      navigate(`/assignments/${id}`)
    } return
    }
   
  return cardType !== 'detailed' ? (
    <div className={classes} onClick={handleNavigate}>
      <div className="px-4 pt-1 mb-2">
        <h1 className="text-lg font-bold font-poppins">{title}</h1>
        {group && (
          <span className="text-pink-600 capitalize text-sm font-bold font-poppins">
            {group}
          </span>
        )}
        <h3 className="text-sm font-bold font-roboto mt-1.5">{subtitle}</h3>
      </div>
      <div className="px-4 py-1 richText">
        <div className="font-roboto">{parse(`${featureText}`)}</div>
      </div>
    </div>
  ) : (
    <div className={classes}>
      <div className="px-4 pt-1">
        <div className="flex flex-row w-full justify-between">
          <h2 className="text-lg font-bold font-poppins">{title}</h2>
          {iconEdit && (
            <MdEdit
              className={'text-2xl text-pink-600'}
              onClick={onClickEditIcon}
            />
          )}
        </div>
        <span className="text-pink-600 capitalize text-sm font-bold font-poppins">
          {group}
        </span>
        <h3 className="text-sm font-bold font-roboto mt-1.5">
          {subtitle}
        </h3>
      </div>
      <div className="border-b-2 mt-2 mb-1 border-pink-600"></div>
      <div className="px-4 py-1 font-roboto richText">
       {parse(`${featureText}`)}
      </div>
    </div>
  );
};
