interface TitleProps {
  title: string;
  underline?: boolean;
}

const baseTitleClass = 'font-bold font-sans text-lg';

const Title = ({ title, underline }: TitleProps) => {
  const underlineClass = 'border-b-4 border-pink-600';

  const getStyling = (isUnderlined: boolean | undefined) =>
    isUnderlined ? `${baseTitleClass} ${underlineClass}` : `${baseTitleClass}`;

  const classes = getStyling(underline);

  return (
    <h1 className={classes}>
      {title}
      {underline}
    </h1>
  );
};

export default Title;
