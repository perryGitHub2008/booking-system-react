import Grid from '@mui/material/Grid';
import DestinationAutoComplete from './DestinationAutoComplete';
import Button from '@mui/material/Button'
import {useState} from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';

import FlightPassengeSelector from './FlightPassengerSelector';
import FlightOneWayDatePicker from './FlightOneWayDatePicker';
import FlightRoundTripDateRangePicker from './FlightRoundTripDateRangePicker';
function FlightTab(){
    const [tripState, setTripState] = useState(true)
    
    return(
        <>
            <Button variant={tripState ? "contained":"disable"} onClick={()=>setTripState(true)}>
                One-way
            </Button>
            <Button variant={!tripState ? "contained":"disable"} onClick={()=>setTripState(false)}>
                Round-trip
            </Button>
            
            <Grid container spacing={2} sx={{mt:1}}>
                <Grid item xs={6}>
                <DestinationAutoComplete label="Flying From"/>
                </Grid>
                <Grid item xs={6}>
                <DestinationAutoComplete label="Flying To"/>
                </Grid>
                <Grid item xs={6}>
                {tripState ? <FlightOneWayDatePicker/> : <FlightRoundTripDateRangePicker/> }
                </Grid>
                <Grid item xs={6}>
                    <FlightPassengeSelector/>
                </Grid>
                <Grid item xs={5.5}>
                    <FormGroup row sx={{border:1, borderColor:'grey.600',borderRadius:'4px'}}>
                        <FormControlLabel sx={{ml:1}} control={<Checkbox />} label="Add hotel to save up to 25%" />
                        
                        <Chip sx={{mt:0.5}} color="error" label="Bundle and Save" />
                    </FormGroup>
                </Grid>
            </Grid>
            <Button variant="contained" sx={{mt:2, mx: "auto", width: [400,650,950] }}>
                Search
            </Button>
        </>
    );
}

export default FlightTab;
