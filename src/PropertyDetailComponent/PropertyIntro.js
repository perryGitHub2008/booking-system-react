import React from 'react';
import {useState} from 'react'
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function PropertyIntro(){
    const [value, setValue] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Paper sx={{width: '1080px',height: '56px'}} variant="outlined">
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Overview"  />
                <Tab label="Rooms" />
                <Tab label="Reviews"  />
            </Tabs>
        </Paper>
    )
}
export default PropertyIntro
