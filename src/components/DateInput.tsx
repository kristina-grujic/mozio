import React from 'react';
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';

type NumericProps = {
  label: string;
  value: Dayjs | null;
  minValue?: Dayjs;
  maxValue?: Dayjs;
  onChange: (value: Dayjs | null) => void;
  errorText?: string;
  invalid?: boolean;
}

const DateInput = ({ label, value, onChange, minValue = dayjs(), maxValue, errorText, invalid }: NumericProps) => {
  return (
    <MobileDatePicker
      maxDate={maxValue}
      minDate={minValue}
      format="MM/DD/YYYY"
      closeOnSelect
      value={value}
      onChange={onChange}
      label={label}
      slotProps={{
        textField: {
          variant: "standard",
          error: invalid,
          helperText: (invalid ? errorText: '')
        },
      }}
      sx={{
        marginLeft: 1,
      }}
    />
  );
}

export default DateInput;