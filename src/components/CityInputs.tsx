import React, { useCallback } from 'react';
import { Box } from '@mui/system';
import { FieldArrayRenderProps } from 'react-final-form-arrays'
import Autocomplete from './Autocomplete';
import { Button, IconButton } from '@mui/material';
import { Field } from 'react-final-form';

type CityInputProps = {
  index: number;
  label: string;
  value: string | null;
  onDelete: (index: number) => void;
  onChange: (value: string ) => void;
  onFocus: React.FocusEventHandler<HTMLElement>;
  onBlur: React.FocusEventHandler<HTMLElement>;
  isDeletable?: boolean;
  isFinal?: boolean;
  invalid?: boolean;
  errorText?: string;
}

const CityInput = ({
  index,
  label,
  value,
  onChange,
  onDelete,
  isDeletable,
  isFinal,
  invalid,
  errorText,
  onFocus,
  onBlur
}: CityInputProps) => {
  const handleChange = useCallback((newValue: string | null) => {
    onChange(newValue || '');
  }, [onChange]);

  const handleDelete = useCallback(() => {
    if (!isDeletable) {
      return;
    }
    onDelete(index);
  }, [onChange, isDeletable]);
  return (
    <Box>    
      <Autocomplete
        label={label}
        value={value}
        onChange={handleChange}
        errorText={errorText}
        invalid={invalid}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {
        isDeletable && (
          <IconButton onClick={handleDelete}>
            x
          </IconButton>
        )
      }
    </Box>
  )
}

type CityInputsProps = {
  cities: FieldArrayRenderProps<string, HTMLElement>['fields'];
}

const CityInputs = ({ cities }: CityInputsProps) => {
  const addCity = useCallback(() => {
    cities.push('');
  }, [cities]);

  const removeCity = useCallback((index: number) => {
    cities.remove(index);
  }, [cities]);

  return (
    <Box>
      {
        cities.map((name, index) => (
          <Field name={name} key={name} render={({ input, meta }) => (
            <CityInput
              label={index === 0 ? 'City of origin' : 'City of destination'}
              index={index}
              value={input.value}
              onChange={input.onChange}
              onDelete={removeCity}
              onFocus={input.onFocus}
              onBlur={input.onBlur}
              isFinal={index === cities.length! - 1}
              isDeletable={index !== 0 && cities.length !== 2}
              errorText={`You must choose ${index === 0 ? 'the city of origin' : 'the destination'}`}
              invalid={meta.touched && meta.invalid}
            />
          )}
          />
        ))
      }
      <Button onClick={addCity}>Add destination</Button>
    </Box>
  )
}

export default CityInputs;