import React from 'react';
import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';
import useCities from '../hooks/useCities';

type AutocompleteProps = {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  onFocus: React.FocusEventHandler<HTMLElement>;
  onBlur: React.FocusEventHandler<HTMLElement>;
  errorText?: string;
  invalid?: boolean;
}

const Autocomplete = ({label, value, onChange, invalid, errorText, onFocus, onBlur}: AutocompleteProps) => {
  const { getCities, data, loading } = useCities();
  return (
    <MuiAutocomplete 
      options={data}
      value={value}
      filterOptions={(x) => x}
      onChange={(event, value) => onChange(value)}
      onInputChange={(event, value) => getCities(value)}
      loading={loading}
      onFocus={onFocus}
      onBlur={onBlur}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="standard"
          error={invalid}
          helperText={invalid ? errorText: ''}
        />
      )}
    />
  );
}

export default Autocomplete;