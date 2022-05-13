import React, { useState ,Fragment} from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function FlightRoundTripDateRangePicker() {
    const [dateRange, setDateRange] = useState([null, null]);

    return (

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker 
              disablePast
              startText="Departure"
              endText="Return"
              value={dateRange}
              onChange={(dateRange) => {
                setDateRange(dateRange);
              }}
              renderInput={(startProps, endProps) => (
                <Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </Fragment>
              )}
            />
        </LocalizationProvider>

    );
  }
  
  export default FlightRoundTripDateRangePicker;
