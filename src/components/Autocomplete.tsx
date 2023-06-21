import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { styled, Autocomplete as MuiAutocomplete, TextField, Typography } from '@mui/material';
import useCities from '../hooks/useCities';

const StyledAutocomplete = styled(MuiAutocomplete<string | null>)(({ error }: {error?: boolean}) => ({
  marginLeft: "0px !important",
  marginTop: 5,
  "& .MuiInputBase-root": {
    borderRadius: '8px',
    marginLeft: 0,
    border: `1px solid ${error ? 'red' : '#ccc'}`,
  },
  "& .MuiInputBase-root:before": {
    display: 'none'
  },
  "& .MuiInputBase-input": {
    padding: "12px !important",
    width: "unset !important",
    minWidth: '25vw !important',
  },
  "& .MuiFormLabel-root": {
    top: "-8px",
    left: "5px",
    fontSize: 16,
    transform: 'unset',
  }
}));

type AutocompleteProps = {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  onFocus: React.FocusEventHandler<HTMLElement>;
  onBlur: React.FocusEventHandler<HTMLElement>;
  errorText?: string;
  invalid?: boolean;
  skipDebounce?: boolean;
}

type NoOptionsProps = {
  error?: string | null;
}

const NoOptions = ({ error }: NoOptionsProps) => {
  if (error) {
    return <Typography sx={{color: 'red'}}>Oops! Failed to search with this keyword.</Typography>;
  }
  return <Typography>No options available for searched keyword</Typography>;
}

const Autocomplete = ({label, value, onChange, invalid, errorText, onFocus, onBlur, skipDebounce}: AutocompleteProps) => {
  const { getCities, data, loading, error, clearError } = useCities();
  const debouncedGetCities = useDebouncedCallback((event, value) => {
    getCities(value);
  }, 300);

  return (
    <StyledAutocomplete 
      options={data}
      value={value}
      filterOptions={(x) => x}
      onChange={(event, value) => onChange(value)}
      onInputChange={skipDebounce ? (event, value) => getCities(value) : debouncedGetCities}
      loading={loading}
      onFocus={onFocus}
      onBlur={onBlur}
      onClose={clearError}
      noOptionsText={<NoOptions error={error} />}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="standard"
          error={invalid || !!error}
          helperText={(
              invalid ? errorText: ''
          )}
        />
      )}
    />
  );
}

export default Autocomplete;