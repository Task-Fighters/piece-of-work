interface ButtonProps {
  buttonColor?: 'black' | 'pink' | 'white';
  label: string;
  onClick?: () => void;
}

const base_button =
  'cursor-pointer rounded border-2 font-bold leading-none inline-block font-sans text-sm px-4 py-2 w-full mb-4';

export const Button = ({
  label,
  buttonColor = 'black',
  onClick
}: ButtonProps) => {
  let mode = 'text-white border-black bg-black';

  switch (buttonColor) {
    case 'pink':
      mode = 'text-pink-600 border-pink-600 bg-white';
      break;
    case 'white':
      mode = 'text-black border-black bg-white';
      break;
  }

  const classes = `${base_button} ${mode}`;

  return (
    <button type="button" className={classes} onClick={onClick}>
      {label}
    </button>
  );
};
