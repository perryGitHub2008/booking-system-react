import React from 'react';
import { Box, Typography,Divider } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RoomOffer from './RoomOffer';

function PropertyRooms(props){
    return (
        <Box sx={{mt:2}} ref={props.refProp}>
            <Typography sx={{mb:1}} variant="h5"  component="div">
                Select your room
            </Typography>
            <Divider />
            <Typography sx={{mt:1}} variant="body1"  component="div">
                {props.property.room.length} room types |    room offers            
            </Typography>

            <Box sx={{display:'flex',width:208}}>
            <InfoOutlinedIcon sx={{fontSize:'12px', mt:'3px'}}/>
            <Typography variant="caption"  component="p">
                Prices do not include taxes & fees
            </Typography>
            </Box>
            <RoomOffer property={props.property} room={props.room} checkInOut={props.checkInOut} offer={props.offer}/>
        </Box>

    )
}
export default PropertyRooms
