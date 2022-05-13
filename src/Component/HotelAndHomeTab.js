import Grid from '@mui/material/Grid';
import DestinationAutoComplete from './DestinationAutoComplete';
import CheckInCheckOutPicker from './CheckInCheckOutPicker';
import RoomSelector from './RoomSelector';
import Button from '@mui/material/Button'
import{Link} from 'react-router-dom'
import { useState } from 'react';

function HotelAndHomeTab(){
    const [destination, setDestination] = useState({ code: 'HK', label: 'Hong Kong', phone: '852' })
    const setDestinationCallback = (country) =>{
        setDestination(country)
    }
    return(
        <>
            <DestinationAutoComplete setDestinationCallback={setDestinationCallback}/>
            <br></br>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                <CheckInCheckOutPicker />
                </Grid>
                <Grid item xs={5}>
                <RoomSelector />
                </Grid>
            </Grid>
            <Button
                component={Link} 
                to={{
                    pathname: `/search?country=${destination['code']}`,
                    state:123 
                    }}
                variant="contained" 
                sx={{mt:2, mx: "auto", width: [400,650,950] }}>
                Search
            </Button>
        </>
    );
}

export default HotelAndHomeTab;
