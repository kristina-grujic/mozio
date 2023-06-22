import React, { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { Form as FinalForm, Field as FinalField } from 'react-final-form'
import dayjs, { Dayjs } from 'dayjs';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import Numeric from '../components/Numeric';
import DateInput from '../components/DateInput';
import CityInputs from '../components/CityInputs';
import { useValidationSchema } from '../hooks/useValidationSchema';
import { Stack, styled } from '@mui/material';
import FormRouteLinker from '../components/FormRouteLinker';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, StyledButton } from '../components/common';

const validationSchema = yup.object({
	cities: yup.array().of(
    yup.string().required()
  ).min(2),
  passengers: yup.number().required().min(1),
  date: yup.date().required().min(dayjs().startOf('day'))
});

export type FormValues = {
  cities: string[];
  passengers: number;
  date: Dayjs | null;
}

const StyledStack = styled(Stack)(({theme}) => ({
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  },
}))

const InputsContainer = styled(Stack)(({theme}) => ({
  flexDirection: 'column',
  alignContent: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
}))

function Form() {
  const validate = useValidationSchema(validationSchema);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onSubmit = useCallback((values: FormValues) => {
    const formatted = {
      cities: values.cities.join(','),
      passengers: values.passengers.toLocaleString(),
      date: values.date!.format('YYYY-MM-DD')
    };
    navigate(`/result?${(new URLSearchParams(formatted).toString())}`);
  }, [navigate]);

  const initialValues = useMemo(() => {
    let cities = searchParams.get('cities');
    let date = searchParams.get('date');
    return {
      cities: cities ? cities.split(',') : ['',''],
      passengers: parseInt(searchParams.get('passengers') || '0'),
      date: date ? dayjs(date) : null
    }
  }, []);

  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={validate}
      mutators={{
        ...arrayMutators
      }}
      initialValues={initialValues}
      render={({ values, handleSubmit, invalid }) => (
        <Container>
          <StyledStack>
            <FieldArray name="cities">
              {({ fields }) => (<CityInputs cities={fields} />)}
            </FieldArray>
            <InputsContainer>
              <FinalField
                name="passengers"
                render={({ input, meta }) => (
                  <Numeric
                    label={"Passengers"}
                    value={input.value}
                    onChange={input.onChange}
                    invalid={meta.invalid}
                    errorText="Select passengers"
                  />
                )}
              />
              <FinalField
                name="date"
                render={({ input, meta }) => (
                  <DateInput
                    label={"Date"}
                    value={input.value}
                    onChange={input.onChange}
                    invalid={meta.invalid}
                    errorText="Date is required"
                  />
                )}
              />
            </InputsContainer>
          </StyledStack>
          <StyledButton onClick={handleSubmit} disabled={invalid}>Submit</StyledButton>
          <FormRouteLinker values={values} />
        </Container>
      )}
    />
  );
}

export default Form;
