interface TitleProps {
  title: string;
  underline?: boolean;
  className?: string;
}

const baseTitleClass = 'font-bold font-sans mb-4 text-xl';

const Title = ({ title, underline, className }: TitleProps) => {
  const underlineClass = 'border-b-2 border-pink-600';

  const getStyling = (isUnderlined: boolean | undefined) =>
    isUnderlined ? `${baseTitleClass} ${underlineClass}` : `${baseTitleClass}`;

  const classes = getStyling(underline);

  return (
    <h1 className={`${className} ${classes}`}>
      {title}
      {underline}
    </h1>
  );
};

export default Title;
