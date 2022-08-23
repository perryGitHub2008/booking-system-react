import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CheckInCheckOutPicker from '../Component/CheckInCheckOutPicker';
import DestinationAutoComplete from '../Component/DestinationAutoComplete';
import RoomSelector from '../Component/RoomSelector';
import{Link} from 'react-router-dom'
import { useState,useMemo } from 'react';
import { AppBar , Toolbar} from '@mui/material';
import {useLocation} from "react-router-dom";

function SearchView(props){
    function useQuery() {
        const { search } = useLocation();
    
        return useMemo(() => new URLSearchParams(search), [search]);
    }
    const query = useQuery();

    const [destination, setDestination] = useState({ data: query.get("country"), type: query.get('searchtype')})
    const [room, setRoom] = useState({Adults:query.get("adult"),Room:query.get("room")});
    const [checkInOut, setCheckInOut] = useState([query.get("checkin"), query.get("checkout")]);
    const setDestinationCallback = (country) =>{
        setDestination(country)
    }
    const setRoomCallback = (room) =>{
        setRoom(room)
    }
    const setCheckInOutCallback = (date) =>{
        setCheckInOut(date)
    }
    
    return (
        <>
            <AppBar position="relative"
                    color='transparent'

            >
                <Toolbar variant="dense"                 
                        sx={{ py: 1, background: 'rgb(158, 158, 158,.3)' }}
                >
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={2}>
                            <DestinationAutoComplete setDestinationCallback={setDestinationCallback} />
                        </Grid>
                        <Grid item xs={2} sx={{ ml: 1 }}>
                            <CheckInCheckOutPicker setCheckInOutCallback={setCheckInOutCallback}/>
                        </Grid>
                        <Grid item xs={2} sx={{ ml: 1 }}>
                            <RoomSelector setRoomCallback={setRoomCallback} />
                        </Grid>
                        <Grid item xs={1}>
                            <Button
                                variant="contained"
                                sx={{ ml: 3, height: '56px', width: '100%' }}
                                component={Link}
                                to={{
                                    pathname: `/search?country=${destination['data']}&searchtype=${destination['type']}&room=${room.Room}&adult=${room.Adults}&checkin=${checkInOut[0]}&checkout=${checkInOut[1]}`,
                                    state: 123
                                }}
                                onClick={()=>{props.setLoading(true)}}
                            >Search</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default SearchView;
