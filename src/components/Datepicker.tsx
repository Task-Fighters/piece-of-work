import { Input } from '../components/Input';

interface DatePickerProps {
  value?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Datepicker = ({ onChange, value }: DatePickerProps) => {
  return (
    <div>
      <Input
        value={value}
        placeholder="Select a date"
        date
        label="Date"
        required={true}
        onChange={onChange}
      />
    </div>
  );
};

export default Datepicker;
