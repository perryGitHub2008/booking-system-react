import React, { useState ,Fragment} from 'react';

import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {useLocation} from "react-router-dom";
import {useMemo} from 'react'



function CheckInCheckOutPicker(props) {
  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  } 
  const query = useQuery();
    const today = new Date();
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const date = () =>{
      if(query.get('checkin') !== null) {
        return [query.get('checkin'),query.get('checkout')]
      } else {
        return [today, tomorrow]
      }
    }
    const [dateRange, setDateRange] = useState(date);



    return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker 
              disablePast
              startText="Check-in"
              endText="Check-out"
              value={ dateRange }
              onChange={(dateRange) => {
                setDateRange(dateRange);
                props.setCheckInOutCallback(dateRange);
              }}
              renderInput={(startProps, endProps) => (
                <Fragment>
                  <TextField {...startProps} />
                  <TextField {...endProps} />
                </Fragment>
              )}
            />
        </LocalizationProvider>

    );
  }
  
  export default CheckInCheckOutPicker;
