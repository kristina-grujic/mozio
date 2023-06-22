import React from 'react';
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';
import { styled } from '@mui/material';

type NumericProps = {
  label: string;
  value: Dayjs | null;
  minValue?: Dayjs;
  maxValue?: Dayjs;
  onChange: (value: Dayjs | null) => void;
  errorText?: string;
  invalid?: boolean;
}

const StyledDatePicker = styled(MobileDatePicker<Dayjs>)(({ error }: {error?: boolean}) => ({
  marginLeft: "0px !important",
  margin: '20px 0',
  marginRight: '20px',
  "& .MuiInputBase-root": {
    borderRadius: '8px',
    marginLeft: 0,
    border: `1px solid ${error ? 'red' : '#ccc'}`,
  },
  "& .MuiInputBase-root:before": {
    display: 'none'
  },
  "& .MuiInputBase-input": {
    padding: "12px",
    width: "120px",
  },
  "& .MuiFormLabel-root": {
    top: "-8px",
    left: "5px",
    fontSize: 16,
    transform: 'unset',
  },
  "& .MuiFormHelperText-root": {
    fontSize: 14,
  }
}));

const DateInput = ({ label, value, onChange, minValue = dayjs(), maxValue, errorText, invalid }: NumericProps) => {
  return (
    <StyledDatePicker
      maxDate={maxValue}
      minDate={minValue}
      format="MM/DD/YYYY"
      closeOnSelect
      value={value}
      onChange={onChange}
      label={label}
      error={invalid}
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