import { Input } from '../components/Input';

interface DatePickerProps {
  value?: string | null;
  required? : boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Datepicker = ({ onChange, value, required }: DatePickerProps) => {
  return (
    <div>
      <Input
        value={value}
        placeholder="Select a date"
        date
        label="Date"
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default Datepicker;
