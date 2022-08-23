import React from 'react';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';

function OverviewShortDesc(props){
    return (
        <Paper sx={{height:114,mt:1}} variant="outlined">
            <Box sx={{p:2}}>
                <Typography variant="body2"  component="div">
                    {props.property.shortDescription}
                </Typography>
            </Box>
        </Paper>
    )
}
export default OverviewShortDesc
