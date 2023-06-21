import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import Form from './screens/Form';
import Result from './screens/Result';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <HashRouter>
        <Routes>
          <Route path="/result" element={<Result />} />
          <Route path="/" element={<Form />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </LocalizationProvider>
  );
}

export default App;
