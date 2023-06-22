import React, { useCallback } from 'react';
import {Box, FormControl, FormHelperText, IconButton, InputLabel, styled, Typography} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

type NumericProps = {
  label: string;
  value: number;
  minValue?: number;
  maxValue?: number;
  onChange: (value: number) => void;
  errorText?: string;
  invalid?: boolean;
}

const StyledBox = styled(Box)(({ error }: { error?: boolean}) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${error ? 'red' : '#ccc'}`,
  borderRadius: '8px',
  padding: '0 5px',
  width: 'fit-content'
}));

const StyledButton = styled(IconButton)`
  background: #c7d1f4;
  color: white;
  border-radius: 5px;
  height: 35px;
  width: 35px;
  margin: 8px;
  &:hover {
    background: #7786d2;
  }
`

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
    <Box sx={{margin: '10px 0'}}>
      <InputLabel role="label" error={invalid}>{label}</InputLabel>
      <StyledBox error={invalid}>
        <StyledButton onClick={handleDecrease} data-testid="decrease" disabled={value === minValue}>
          <Remove fontSize='small' />
        </StyledButton>
        <Typography sx={{fontSize: 16, width: '30px', textAlign: 'center'}}>{value}</Typography>
        <StyledButton onClick={handleIncrease} data-testid="increase" disabled={value === maxValue}>
          <Add fontSize='small'/>
        </StyledButton>
      </StyledBox>
      <FormControl error={invalid}>
        {
          invalid ? (
            <FormHelperText sx={{m: 0, fontSize: 14}}>{errorText}</FormHelperText>
          ) : null
        }
      </FormControl>
    </Box>
  );
}

export default Numeric;