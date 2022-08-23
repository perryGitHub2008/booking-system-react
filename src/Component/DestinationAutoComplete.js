import React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Typography, Box } from '@mui/material';
import {  grey } from '@mui/material/colors';
import {useLocation} from "react-router-dom";
import {useMemo} from 'react'
function DestinationAutoComplete(props) {
    function useQuery() {
      const { search } = useLocation();
      return useMemo(() => new URLSearchParams(search), [search]);
    } 
    const query = useQuery();

    return (
      <Autocomplete
        disablePortal
        id="destination-combo-box"
        options={countries}
        defaultValue={query.get('country') !== null ? (countries.find(country=>{return country.data===query.get('country')})) : { type: 'City', label: 'Hong Kong, Hong Kong SAR, China', data:"Hong Kong" }}
        onChange={(event, newValue) => {
          if(newValue !== null )
            props.setDestinationCallback(newValue)
        }}
        renderOption={(props, option) => (
          <li {...props}>
              <Box>
                <Typography>
                {option.label}
                </Typography>
                <Typography sx={{color:grey[500]}} variant='caption'>
                {option.type}
                </Typography>
              </Box>
          </li>
        )}
        renderInput={(params) => <TextField {...params}
        label={props.label !== undefined ? props.label:"Enter a destination or property"} />}
      />
    );
  }
  
  export default DestinationAutoComplete;
  const countries = [
    { type: 'City', label: 'Hong Kong, Hong Kong SAR, China', data:"Hong Kong"},
    { type: 'Area', label: 'MongKok, Hong Kong', data:'MongKok'},
    { type: 'Area', label: 'North Point, Hong Kong', data:'North Point'},
    { type: 'Area', label: 'Causeway Bay, Hong Kong', data:'Causeway Bay' }

  ];