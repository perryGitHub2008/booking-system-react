import React, { useState ,Fragment} from 'react';

import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function CheckInCheckOutPicker() {
    const [dateRange, setDateRange] = useState(['Tue Mar 16 2022 00:00:00 GMT+0800 (台北標準時間)', 'Wed Mar 17 2022 00:00:00 GMT+0800 (台北標準時間)']);

    return (

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker 
              disablePast
              startText="Check-in"
              endText="Check-out"
              value={dateRange}
              onChange={(dateRange) => {
                setDateRange(dateRange);
              }}
              renderInput={(startProps, endProps) => (
                <Fragment>
                  <TextField {...startProps} />

                  <TextField {...endProps} />
                </Fragment>
              )}
            />
            {console.log(dateRange)}
        </LocalizationProvider>

    );
  }
  
  export default CheckInCheckOutPicker;
