import Grid from '@mui/material/Grid';
import DestinationAutoComplete from './DestinationAutoComplete';
import CheckInCheckOutPicker from './CheckInCheckOutPicker';
import RoomSelector from './RoomSelector';
import Button from '@mui/material/Button'
import{Link} from 'react-router-dom'
import { useState } from 'react';

function HotelAndHomeTab(){
    const [destination, setDestination] = useState({ type: 'City', label: 'Hong Kong, Hong Kong SAR, China' , data:"Hong Kong"})
    const [room, setRoom] = useState({Adults:2, Room:1});
    const today = new Date();
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const [checkInOut, setCheckInOut] = useState([today, tomorrow]);
    
    const setDestinationCallback = (country) =>{
        setDestination(country)
    }
    const setRoomCallback = (room) =>{
        setRoom(room)
    }
    const setCheckInOutCallback = (date) =>{
        setCheckInOut(date)
    }
    return(
        <>
            <DestinationAutoComplete setDestinationCallback={setDestinationCallback}/>
            <br></br>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                <CheckInCheckOutPicker setCheckInOutCallback={setCheckInOutCallback}/>
                </Grid>
                <Grid item xs={5}>
                <RoomSelector setRoomCallback={setRoomCallback} />
                </Grid>
            </Grid>
            <Button
                component={Link} 
                to={{
                    pathname: `/search?country=${destination['data']}&searchtype=${destination['type']}&room=${room.Room}&adult=${room.Adults}&checkin=${checkInOut[0]}&checkout=${checkInOut[1]}`,
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
