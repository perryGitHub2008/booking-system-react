import React from 'react';
import Paper from '@mui/material/Paper';
import { Box, Divider, Typography} from '@mui/material';
import { grey } from '@mui/material/colors';
import RoomPhoto from './RoomPhoto';
import BathroomOutlinedIcon from '@mui/icons-material/BathroomOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import NetworkWifiOutlinedIcon from '@mui/icons-material/NetworkWifiOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RoomDetails from './RoomDetails';

function RoomOffer(props){
    return (
        props.property.room.map((room,index)=>{
            return(
                <Paper key={index} sx={{backgroundColor:grey[200]}} variant="outlined">
                    <Box sx={{p:1, backgroundColor:'#fff'}}>
                        <Typography variant="h6"  component="div">
                            {room.name}
                        </Typography>
                    </Box>
                    <Box sx={{display:'flex',width:208,p:2}}>
                        <Box>
                            <RoomPhoto/>
                            <Divider sx={{mt:1}}/>

                            <Box sx={{mt:1}}>
                                <Box sx={{display:'flex',width:208}}>
                                    <NetworkWifiOutlinedIcon sx={{fontSize:'13px', mt:'3px'}}/>
                                    <Typography variant="caption"  component="p" sx={{ml:2}}>
                                    {room.wifi} Wi-Fi
                                    </Typography>
                                </Box>
                                <Box sx={{display:'flex',width:208}}>
                                    <LandscapeOutlinedIcon sx={{fontSize:'13px', mt:'3px'}}/>
                                    <Typography variant="caption"  component="p" sx={{ml:2}}>
                                    Room size: {room.size} ft²
                                    </Typography>
                                </Box>
                                <Box sx={{display:'flex',width:208}}>
                                    <SquareFootOutlinedIcon sx={{fontSize:'13px', mt:'3px'}}/>
                                    <Typography variant="caption"  component="p" sx={{ml:2}}>
                                    {room.view} view
                                    </Typography>
                                </Box>
                                <Box sx={{display:'flex',width:208}}>
                                    <BathroomOutlinedIcon sx={{fontSize:'13px', mt:'3px'}}/>
                                    <Typography variant="caption"  component="p" sx={{ml:2}}>
                                    {room.shower}
                                    </Typography>
                                </Box>
                                <Box sx={{display:'flex',width:208}}>
                                    <AddCircleOutlineOutlinedIcon sx={{fontSize:'13px', mt:'3px'}}/>
                                    <Typography variant="caption"  component="p" sx={{ml:2}}>
                                    See all room facilities
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ml:1}}>
                            <RoomDetails room={room} roomSelect={props.room} checkInOut={props.checkInOut} offer={props.offer}/>
                        </Box>
                    </Box>
                </Paper>
            )
        })
    )
}
export default RoomOffer
