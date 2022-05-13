import Grid from '@mui/material/Grid';
import FlightAndHotelTabSeatTypeSelector from './FlightAndHotelTabSeatTypeSelector';
import FlightAndHotelTabTripTypeSelector from './FlightAndHotelTabTripTypeSelector';
import DestinationAutoComplete from './DestinationAutoComplete';
import {useState} from  'react';
import FlightOneWayDatePicker from './FlightOneWayDatePicker';
import FlightRoundTripDateRangePicker from  './FlightRoundTripDateRangePicker';
import FlightAndHotelTabPassengerSelector from './FlightAndHotelTabPassengerSelector';
import FlightAndHotelTabRoomSelector from './FlightAndHotelTabRoomSelector';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
function FlightAndHotelTab(){
    const [tripType, setTripType] = useState('One-way')
    const setTripTypeCallback = (type)=>{
        setTripType(type)
    }
    const [differentChecked, setDifferentChecked] = useState(false);

    const handleDifferentChecked = (event) => {
        setDifferentChecked(event.target.checked);
    };
    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}  sx={{zIndex:9}}>
                    <FlightAndHotelTabTripTypeSelector setTripTypeCallback={setTripTypeCallback}/>
                    <FlightAndHotelTabSeatTypeSelector/>
                </Grid>
                <Grid item xs={6} sx={{display:'flex'}}>
                    <Grid item xs={6}>
                        <DestinationAutoComplete label="Flying From"/>
                    </Grid>
                    <Grid item xs={6}>
                        <DestinationAutoComplete label="Flying To"/>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    {tripType ==='One-way' ? <FlightOneWayDatePicker/> : <FlightRoundTripDateRangePicker/> }
                </Grid>
                {differentChecked &&
                    <>
                    <Grid item xs={6}>
                        <Grid>
                            <DestinationAutoComplete label="Staying at"/>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <FlightRoundTripDateRangePicker/>
                    </Grid>
                    </>
                }
                <Grid item xs={6} sx={{display:'flex', zIndex:8}}>
                    <Grid item xs={6} >
                        <FlightAndHotelTabPassengerSelector/>
                    </Grid>
                    <Grid item xs={6}>
                        <FlightAndHotelTabRoomSelector/>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <FormGroup row sx={{height:'100%',border:1, borderColor:'grey.600',borderRadius:'4px'}}>
                        <FormControlLabel sx={{ml:1}} control={<Checkbox checked={differentChecked} onChange={handleDifferentChecked} />} label="Search for hotel in different cities or dates" />
                    </FormGroup>
                </Grid>
            </Grid>
            <Button variant="contained" sx={{mt:2, mx: "auto", width: [400,650,950] }}>
                Search
            </Button>
        </>
    );
}

export default FlightAndHotelTab;
