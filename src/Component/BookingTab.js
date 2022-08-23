import React, { useEffect, useState} from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SvgIcon from '@mui/material/SvgIcon';
import FlightIcon from '@mui/icons-material/Flight';
import Box from '@mui/material/Box';
import BackgroupImage from '../Image/1920_1080_20121103122249736567.jpg'
import HotelAndHomeTab from './HotelAndHomeTab';
import FlightTab from './FlightTab.js';
import FlightAndHotelTab from './FlightAndHotelTab';

function FlightHotelIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 13v9.023H2V14a1 1 0 0 1 1-1h7zm11.5-3a.5.5 0 0 1 .5.5V22H11V10.5a.5.5 0 0 1 .5-.5h10zM8 18H4v1h4v-1zm8-2h-2v2h1.01v-1H16v-1zm3 0h-2v2h1.01v-1H19v-1zM8 15H4v.954h4V15zm8-2h-2v2h1.01v-1H16v-1zm3 0h-2v2h1.01v-1H19v-1zM8.127 1.301a2 2 0 0 1 1.61.106l4.94 2.576 3.726-1.357a1.19 1.19 0 1 1 .814 2.236L8.473 8.772a2 2 0 0 1-2.25-.635L4 5.337l.485-.177a2 2 0 0 1 1.868.267l1.442 1.06L10.95 5.34 7.085 1.681z" />
      </SvgIcon>
    );
  }

function BookingTab(props) {
    const [value, setValue] = useState(props.tabIndex);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(()=>{
      setValue(props.tabIndex);
    },[props])
    
    return (
      <>
      <Box sx={{height:'400px', backgroundImage:`url(${BackgroupImage})`}}>
      <TabContext value={value}> 
        <Box sx={{pt:8,mx: "auto", width: 150 }}>
          <TabList onChange={handleChange} aria-label="" sx={{position: 'relative', boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',zIndex:'modal', background:'white', borderRadius: 2}}>
            <Tab value="1" href="/hotels-and-homes" onClick={(event) => {event.preventDefault()}} icon={<LocationCityIcon />} aria-label="phone" label="Hotels & Home"/>
            {/*<Tab value="2" href="/fight-and-hotel" onClick={(event) => {event.preventDefault()}} icon={<FlightHotelIcon />} aria-label="favorite" label="Flight + Hotels"/>
            <Tab value="3" href="/fight" onClick={(event) => {event.preventDefault()}} icon={<FlightIcon />} aria-label="phone" label="Flight"/>
            */}
          </TabList>
        </Box>
        <Box sx={{ boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)', background: 'rgba(255, 255, 255, .3)'  ,borderRadius: 3, mt:-2, mx: "auto", width: [450,700,1000]}}>
          <TabPanel value="1">
            <HotelAndHomeTab/>
          </TabPanel>
          <TabPanel value="2"><FlightAndHotelTab/></TabPanel>
          <TabPanel value="3"><FlightTab/></TabPanel>
        </Box>
      </TabContext>
      </Box>
      </>

    );
  }
  
  export default BookingTab;
