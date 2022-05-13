import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function FlightOneWayDatePicker() {
    const [departure, setDeparture] = useState(null);
    const [open, setOpen] = useState(false)
    return (

        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Departure"
                value={departure}
                onChange={(newValue) => {
                setDeparture(newValue);
                }}
                renderInput={(params) => <TextField sx={{width:'100%'}} {...params} onClick={(e) => setOpen(true)} />}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                open={open}
                
            />
        </LocalizationProvider>

    );
  }
  
  export default FlightOneWayDatePicker;
