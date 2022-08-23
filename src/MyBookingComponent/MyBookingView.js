import {useState} from 'react'
import LeftMenu from '../ProfileComponent/LeftMenu';
import Box from "@mui/material/Box";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UpcomingPanel from './UpcomingPanel';
import CompletedPanel from './CompletedPanel';

function MyBookingView() {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  
    return (
        <Box sx={{ width: 1200, mt: 0.5, marginLeft: 'auto', marginRight: 'auto', display:"flex" }}>
            <Box sx={{width:'20%', height:'inherit', boxShadow:'7px 0 8px #e9ebee'}}>
                <LeftMenu/>
            </Box>
            <Box sx={{width:'80%', p:3}}>
                <Box>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', width:'31%' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Upcoming" value="1" />
                                <Tab label="Completed" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"><UpcomingPanel/></TabPanel>
                        <TabPanel value="2"><CompletedPanel/></TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </Box>
    )
}

export default MyBookingView