import React from 'react'
import { Box, Paper, CircularProgress, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

export default function Loading(props) {
  return (
    <Box sx={{width:'100%', 
                height:'100%', 
                backgroundColor:grey[500], 
                opacity:0.9, 
                position:'absolute', 
                top:0, 
                left:0, 
                zIndex:999999}}>
        <Box sx={{ height:'80%', display:'flex', alignItems: 'center', justifyContent:'center'}}>
            <Paper elevation={2} sx={{width:'400px', height:'200px', display:'flex', flexWrap:'wrap', alignItems: 'center', justifyContent:'center'}}>
                <CircularProgress/>
                <Typography variant='body2' sx={{py:2, mt:-10}}>                        
                    {props.text}
                </Typography>
            </Paper>
        </Box>
    </Box>
  )
}
