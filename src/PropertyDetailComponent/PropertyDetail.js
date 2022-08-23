import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CheckInCheckOutPicker from '../Component/CheckInCheckOutPicker';
import DestinationAutoComplete from '../Component/DestinationAutoComplete';
import RoomSelector from '../Component/RoomSelector';
import{Link} from 'react-router-dom'
import { useState } from 'react';
import { AppBar , Toolbar} from '@mui/material';
import {  grey } from '@mui/material/colors';

function PropertyDetail(props){

    const [destination, setDestination] = useState({ type: 'City', label: 'Hong Kong, Hong Kong SAR, China' })
    const setDestinationCallback = (country) =>{
        setDestination(country)
    }



    return (
        <AppBar position="relative"
            color='transparent'
            ref={props.menuRef}
            sx={props.appBarStyle}
            style={{zIndex:1000}}
        >
            <Toolbar variant="dense"
                sx={{ py: 1, background: grey[200] }}
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
                        <CheckInCheckOutPicker setCheckInOutCallback={props.setCheckInOutCallback}/>
                    </Grid>
                    <Grid item xs={2} sx={{ ml: 1 }}>
                    <RoomSelector setRoomCallback={props.setRoomCallback} />
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            variant="contained"
                            sx={{ ml: 3, height: '56px', width: '100%' }}
                            component={Link}
                            to={{
                                pathname: `/search?country=${destination['label']}&room=${props.room.Room}&adult=${props.room.Adults}&checkin=${props.checkInOut[0]}&checkout=${props.checkInOut[1]}`,
                                state: 123
                            }}
                        >Search</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>


    );
}

export default PropertyDetail;
