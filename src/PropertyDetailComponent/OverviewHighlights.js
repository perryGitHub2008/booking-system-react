import React from 'react';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';

function OverviewHighlights(){
    return (
        <Paper sx={{height:146}} variant="outlined">
            <Box sx={{p:'16px'}}>
                <Typography variant="h6"  component="div">
                    Highlights
                </Typography>
            </Box>
        </Paper>
    )
}
export default OverviewHighlights
