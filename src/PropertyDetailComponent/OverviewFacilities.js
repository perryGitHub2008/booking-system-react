import React from 'react';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';

function OverviewFacilities(){
    return (
        <Paper sx={{height:114,mt:1}} variant="outlined">
            <Box sx={{p:'16px'}}>
                <Typography variant="h6"  component="div">
                Facilities
                </Typography>
            </Box>
        </Paper>
    )
}
export default OverviewFacilities
