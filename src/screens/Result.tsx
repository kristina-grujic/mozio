import React, { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import { Box } from '@mui/system';
import Numeric from '../components/Numeric';
import DateInput from '../components/DateInput';
import CityInputs from '../components/CityInputs';
import useDistances from '../hooks/useDistances';

function Result() {
  const { getDistances, data } = useDistances();

  console.log(data);
  useEffect(() => {
    getDistances(['Paris', 'Lyon']);
  }, []);
  return (
    <Box sx={{
      padding: 20
    }}>
      </Box>
    
  );
}

export default Result;
