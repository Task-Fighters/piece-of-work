interface CardProps {
  cardType?: 'card' | 'feature' | 'detailed';
  title: string;
  subtitle: string;
  description: string;
  onClick?: () => void;
}

const base_card = 'text-left border-b-2 leading-relaxed mb-4 w-full';

export const Card = ({
  title,
  subtitle,
  description,
  cardType = 'card',
  onClick
}: CardProps) => {
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

  const classes = `${base_card} ${mode} py-2`;

  return (
    <div className={classes} onClick={onClick}>
      <div className="px-4 pt-1">
        <h2 className="text-xl font-bold font-poppins">{title}</h2>
        <h3 className="text-sm font-bold font-roboto">{subtitle}</h3>
      </div>
      {cardType === 'detailed' && (
        <div className="border-b-2 mt-2 mb-1 border-pink-600"></div>
      )}
      <div className="px-4 py-1">
        <p className="text-sm font-roboto">{featureText}</p>
      </div>
    </div>
  );
};
