import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  cardType?: 'card' | 'feature' | 'detailed';
  title: string;
  id?: number;
  subtitle: string;
  description: string;
  onClick?: (e: any) => void;
}

const base_card = 'text-left border-b-2 leading-tight mb-4 w-full';

export const Card = ({
  id,
  title,
  subtitle,
  description,
  cardType = 'card',
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
      mode = 'text-black border-black bg-gray-100 md:w-128';
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

  const classes = `${base_card} ${mode} py-2`;
  const handleNavigate = () => navigate(`/assignments/${id}`);

  return cardType !== 'detailed' ? (
    <div className={classes} onClick={handleNavigate}>
      <div className="px-4 pt-1">
        <h1 className="text-lg font-bold font-poppins">{title}</h1>
        <h3 className="text-sm font-bold font-roboto">{subtitle}</h3>
      </div>
      <div className="px-4 py-1">
        <div className="text-md font-roboto">{parse(`${featureText}`)}</div>
      </div>
    </div>
  ) : (
    <div className={classes}>
      <div className="px-4 pt-1">
        <h2 className="text-lg font-bold font-poppins">{title}</h2>
        <h3 className="text-sm font-bold font-roboto">{subtitle}</h3>
      </div>
      <div className="border-b-2 mt-2 mb-1 border-pink-600"></div>
      <div className="px-4 py-1">
        <div className="text-md font-roboto">{parse(`${featureText}`)}</div>
      </div>
    </div>
  );
};
