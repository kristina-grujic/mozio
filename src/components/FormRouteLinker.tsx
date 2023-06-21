import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormValues } from '../screens/Form';

type FormRouteLinkerProps = {
  values: FormValues;
}

const FormRouteLinker = ({ values }: FormRouteLinkerProps) => {
  const [,setSearchParams] = useSearchParams();
  useEffect(() => {
    const cities = values.cities?.join(',');
    const formattedDate = values.date ? values.date.format('YYYY-MM-DD') : '';
    setSearchParams({
      cities,
      passengers: values.passengers.toLocaleString(),
      date: formattedDate
    });
  }, [setSearchParams, values]);

  return null;
};

export default FormRouteLinker;