import React, { useCallback } from 'react';
import { Box } from '@mui/system';
import { FieldArrayRenderProps } from 'react-final-form-arrays'
import Autocomplete from './Autocomplete';
import { Button, IconButton, styled } from '@mui/material';
import { Field } from 'react-final-form';
import { AddCircleOutline, HighlightOff, LocationOnOutlined, PanoramaFishEyeOutlined } from '@mui/icons-material';

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

const StyledCityBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  margin: '10px',
  marginRight: '50px',
  [theme.breakpoints.down('md')]: {
    marginRight: '10px'
  }
}));

const StyledIcon = styled(Box)(() => ({
  position: 'relative',
  '&:before': {
    content: '"• • •"',
    position: 'absolute',
    top: '40px',
    left: '-3px',
    transform: 'rotate(90deg)',
    display: 'inline-block',
    fontSize: 20,
  }
}))


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
    <StyledCityBox>
      {
        isFinal ?
        <LocationOnOutlined sx={{color: 'red', mr: 4.5, mb: 2, fontSize: 30}} />
        : <StyledIcon><PanoramaFishEyeOutlined sx={{ mr: 5, mb: 2 }}/></StyledIcon>
      }
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
        isDeletable ? (
          <IconButton onClick={handleDelete} sx={{mb: '5px', ml: 1}}>
            <HighlightOff sx={{ color: '#7786d2'}} />
          </IconButton>
        ) : <Box sx={{width: 50}} />
      }
    </StyledCityBox>
  )
}

type CityInputsProps = {
  cities: FieldArrayRenderProps<string, HTMLElement>['fields'];
}

const StyledButton = styled(Button)`
  text-transform: none !important;
  margin: 10px 5px;
`

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
      <StyledButton onClick={addCity}>
        <AddCircleOutline  sx={{ mr: 5 }} />
        Add destination
      </StyledButton>
    </Box>
  )
}

export default CityInputs;