import React, { useCallback } from 'react';
import {Box, FormControl, FormHelperText, IconButton, InputLabel, Typography} from '@mui/material';

type NumericProps = {
  label: string;
  value: number;
  minValue?: number;
  maxValue?: number;
  onChange: (value: number) => void;
  errorText?: string;
  invalid?: boolean;
}

const Numeric = ({ label, value, onChange, minValue = 0, maxValue, invalid, errorText }: NumericProps) => {
  const handleDecrease = useCallback(() => {
    let newValue = value - 1;
    if (newValue >= minValue) {
      onChange(newValue);
    }
  }, [value, minValue, onChange]);

  const handleIncrease = useCallback(() => {
    let newValue = value + 1;
    if (!maxValue || (newValue <= maxValue)) {
      onChange(newValue);
    }
  }, [value, maxValue, onChange]);

  return (
    <>
      <InputLabel role="label">{label}</InputLabel>
      <Box>
        <IconButton onClick={handleDecrease} data-testid="decrease" disabled={value === minValue}>-</IconButton>
        {value}
        <IconButton onClick={handleIncrease} data-testid="increase" disabled={value === maxValue}>+</IconButton>
      </Box>
      <FormControl error={invalid}>
        {
          invalid ? (
            <FormHelperText>{errorText}</FormHelperText>
          ) : null
        }
      </FormControl>
    </>
  );
}

export default Numeric;