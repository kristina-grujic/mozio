import React, { useCallback, useMemo } from 'react';
import { Form as FinalForm, Field as FinalField } from 'react-final-form'
import { Dayjs } from 'dayjs';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import Numeric from '../components/Numeric';
import DateInput from '../components/DateInput';
import CityInputs from '../components/CityInputs';

type FormValues = {
  cities: string[];
  passengers: number;
  date: Dayjs | null;
}

function Form() {
  const handleSubmit = useCallback((values: FormValues) => {
    console.log(values);
  }, []);

  const initialValues = useMemo(() => ({
    cities: ['', ''],
    passengers: 0,
    date: null
  }), []);

  return (
    <FinalForm
      onSubmit={handleSubmit}
      mutators={{
        ...arrayMutators
      }}
      initialValues={initialValues}
      render={() => (
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
              />
            )}
          />
        </>
      )}
    />
  );
}

export default Form;
