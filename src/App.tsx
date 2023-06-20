import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs';
import Autocomplete from './components/Autocomplete';
import { Box } from '@mui/system';
import Numeric from './components/Numeric';
import DateInput from './components/DateInput';

function App() {
  const [origin, setOrigin] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const [passengers, setPassengers] = useState<number>(0);
  const [date, setDate] = useState<Dayjs | null>(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{
        padding: 20
      }}>
        <Autocomplete label={'City of origin'} value={origin} onChange={setOrigin} />
        <Autocomplete label={'City of destination'} value={destination} onChange={setDestination} />
        <Numeric label={'Passengers'} value={passengers} onChange={setPassengers} />
        <DateInput label={'Date'} value={date} onChange={setDate} />
      </Box>
    </LocalizationProvider>
  );
}

export default App;
