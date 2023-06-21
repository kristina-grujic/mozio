import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Form from './screens/Form';
import Result from './screens/Result';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Form />
      <Result />
    </LocalizationProvider>
  );
}

export default App;
