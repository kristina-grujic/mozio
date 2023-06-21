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
import { Button } from '@mui/material';

const validationSchema = yup.object({
	cities: yup.array().of(
    yup.string().required()
  ).min(2),
  passengers: yup.number().required().min(1),
  date: yup.date().required().min(dayjs().startOf('day'))
});

type FormValues = {
  cities: string[];
  passengers: number;
  date: Dayjs | null;
}

function Form() {
  const validate = useValidationSchema(validationSchema);
  const onSubmit = useCallback((values: FormValues) => {
    console.log(values);
  }, []);

  console.log(dayjs().startOf('day'));

  const initialValues = useMemo(() => ({
    cities: ['', ''],
    passengers: 0,
    date: null
  }), []);

  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={validate}
      mutators={{
        ...arrayMutators
      }}
      initialValues={initialValues}
      render={({ handleSubmit, invalid }) => (
        <>
          <FieldArray name="cities">
            {({ fields }) => (<CityInputs cities={fields} />)}
          </FieldArray>
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
          <Button onClick={handleSubmit} disabled={invalid}>Submit</Button>
        </>
      )}
    />
  );
}

export default Form;
