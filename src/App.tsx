import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from './screens/Form';
import Result from './screens/Result';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/result" element={<Result />} />
          <Route path="/" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
