import React from 'react';
import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';
import useCities from '../hooks/useCities';

type AutocompleteProps = {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
}

const Autocomplete = ({label, value, onChange}: AutocompleteProps) => {
  const { getCities, data, loading } = useCities();
  return (
    <MuiAutocomplete 
      options={data}
      value={value}
      filterOptions={(x) => x}
      onChange={(event, value) => onChange(value)}
      onInputChange={(event, value) => getCities(value)}
      loading={loading}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="standard"/>
      )}
    />
  );
}

export default Autocomplete;