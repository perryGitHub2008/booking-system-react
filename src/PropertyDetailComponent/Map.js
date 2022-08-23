import React, { useState } from 'react';
import { GoogleMap, LoadScript ,Marker, InfoWindow } from '@react-google-maps/api';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import HotelImage from './image/f526fd54305fe996b8759421e43ad0e5.jpg'

const containerStyle = {
  width: '100%',
  height: '90vh',
  borderRadius: '5px', 
  boxShadow:"0 2px 7px 1px rgb(0 0 0 / 30%)",
  border: '1px solid #fff'
};

const MapStyles = [
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [
      {visibility: 'off'},
    ]
  }
]

function Map (props){
    const [infoBoxOpen, setInfoBoxOpen] = useState(true);
    const [marker, setMarker] = useState();
    const center = {
      lat: props.lat,
      lng: props.lng
    };
    return (
    <LoadScript
      googleMapsApiKey="AIzaSyAYHJDgieqBeok3hRMM8UZPqXUrkCWolAs"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        mapId="2596649e350331e"
        onClick={(e)=>{
          setInfoBoxOpen(false)
        }}
        onLoad={map => {
          map.setZoom(17);
          map.setCenter(center)
          map.setOptions({styles:MapStyles})
        }}
      >
        <Marker
          position={center}
          onClick={(e) =>{setInfoBoxOpen(true)}}
          onLoad={(marker) => setMarker(marker)}
        />
          {infoBoxOpen !== false ? (
            <InfoWindow
              anchor={marker}
              onCloseClick={(e)=>{setInfoBoxOpen(false)}}
            >
              <Card sx={{ display: 'flex', borderRadius:0}}>
                <CardMedia
                  component="img"
                  sx={{ width: 66}}
                  image={HotelImage}
                  alt="Live from space album cover"
                />
                <Box sx={{padding:'12px'}}>
                  <Typography sx={{fontSize:"14px"}} color="text.secondary" component="div">
                  Hyatt Centric Victoria Harbour
                  </Typography>
                  <Box sx={{ display: 'flex'}}>
                      <Rating name="readOnly" value={5} readOnly sx={{fontSize:"14px", pr:1}} /> 
                      <Typography sx={{fontSize:"14px" , pr:1}} color="text.secondary" component="div">
                      | 
                      </Typography>
                      Excellent 8.5
                  </Box>
                </Box>
              </Card>
            </InfoWindow>
          ) : null}
        <></>
      </GoogleMap>
    </LoadScript>
  )
}
export default Map;