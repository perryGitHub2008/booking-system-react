import React from 'react';
import Paper from '@mui/material/Paper';
import { Box, Divider, Typography, Slider } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import{Link} from 'react-router-dom'
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ReviewDetails from './ReviewDetails';

function PropertyReviews(props){
    const rating = props.property.reviews.reduce((prev,curr)=>{
        return prev + curr.cleanliness
                    + curr.facilities
                    + curr.location
                    + curr.room
                    + curr.service
                    + curr.value
    },0)

    const cleanliness = props.property.reviews.reduce((prev,curr)=>{
        return prev + curr.cleanliness
    },0)

    const facilities = props.property.reviews.reduce((prev,curr)=>{
        return prev + curr.facilities
    },0)

    const location = props.property.reviews.reduce((prev,curr)=>{
        return prev + curr.location
    },0)

    const room = props.property.reviews.reduce((prev,curr)=>{
        return prev + curr.room
    },0)

    const service = props.property.reviews.reduce((prev,curr)=>{
        return prev + curr.service
    },0)

    const value = props.property.reviews.reduce((prev,curr)=>{
        return prev + curr.value
    },0)

    const reviewTitle = [
        {name:"Cleanliness", value: cleanliness/props.property.totalReview},
        {name:"Facilities", value: facilities/props.property.totalReview},
        {name:"Location",value: location/props.property.totalReview},
        {name:"Room", value: room/props.property.totalReview},
        {name:"Service", value: service/props.property.totalReview},
        {name:"Value", value: value/props.property.totalReview}
    ];
    
    const totalRating = (rating/(props.property.totalReview*6)).toPrecision(2);

    const ratingEng = (Rating) =>{
        if(Rating >= 9)
            return "Exceptional";
        else if(Rating >= 8 && Rating <9)
            return "Excellent";
        else if(Rating >= 7 && Rating <8)
            return "Very Good";
        else if(Rating >= 6 && Rating <7)
            return "Good";
        else
            return "Below Expectation";
    }
    const highestRating = ()=>{
        let tempList = [...reviewTitle]
        tempList.sort((prev, curr)=>{
            return curr.value - prev.value;
        })
        const list = [];
        for (var i = 0; i <= 2 ; i++){
            list.push(
                <Typography key={i} align='center' sx={{color:blue[600],ml:2, width:'33%',borderLeft: `1px solid ${grey[300]}`}} variant="h6">
                    <b>{tempList[i].value.toPrecision(2)}</b>    
                    <Typography color="text.secondary">
                    {tempList[i].name}
                    </Typography>
                </Typography>  
            )
        }
        return list
    }
    

    return (
        <Paper sx={{mt:1}} elevation={0} ref={props.refProp}>
            <Box sx={{p:'16px'}}>
                <Typography variant="h6"  component="div">
                Reviews of Harbour Plaza North Point from real guests
                </Typography>
                <Typography variant="overline"  component="div">
                Overall rating
                </Typography>
                <Box sx={{display:'flex', my:2}}>
                    <Box sx={{display: 'flex',width:'30%'}}>
                        <Box 
                        sx={{ml:1, 
                            width: 64, 
                            height: 64, 
                            backgroundColor: blue[600], 
                            borderRadius: '50% 50% 0 50%', 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Typography style={{textAlign: 'center'}} variant="h5" color="white">
                                {totalRating}
                            </Typography>
                        </Box>
                        <Typography sx={{ml:2}} variant="h6">
                            <b>{ratingEng(totalRating)}</b>    
                            <Typography color="text.secondary">
                                {props.property.totalReview} reviews
                            </Typography>
                        </Typography>
                    </Box>
                    <Box sx={{width:'70%', display:'flex'}}>
                        {highestRating()}               
                    </Box>
                </Box>
                <Divider/>  
                <Box sx={{display:'flex', m:2}}>
                    <Box>
                        <Typography sx={{display:'inline-block', color:blue[500]}} variant="h4"  component="div">
                        {totalRating}
                            <Typography sx={{display:'inline-block',ml:2}} variant="body1"  component="div">
                            /10
                            </Typography>
                        </Typography>
                        <Typography variant="body1"  component="div">
                            {ratingEng(totalRating)}
                        </Typography>
                        <Typography 
                            variant="body2"  
                            underline="hover"
                            component={Link} 
                            to={{
                                pathname: ``,
                                state:123 
                            }}
                        >
                            From {props.property.totalReview} reviews
                        </Typography>
                    </Box>
                    <Box sx={{ml:2, width:'500px',display:'flex',flexDirection:'row',flexWrap:'wrap',borderRight: `1px solid ${grey[300]}`}}>
                        {reviewTitle.map((review,index)=>{
                            return (
                                <Box key={index} sx={{width:'45%',mr:2}}>
                                    <Slider
                                        value={parseFloat(review.value.toPrecision(2))}
                                        aria-label="Small"
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={10}
                                        step={0.1}
                                        />
                                    <Box sx={{width:'100%'}}>
                                        <Typography sx={{display:'inline-block'}}>{review.name}</Typography>
                                        <Typography sx={{display:'inline-block',float:'right',color:blue[500]}}>{review.value.toPrecision(2)}</Typography>
                                    </Box>
                                </Box>
                            )
                        })}
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <FormControl sx={{ m: 2 }} size='small' component="fieldset" variant="standard">
                            <FormLabel sx={{fontSize:'12px',mb:1}} component="legend"><b>Rating</b></FormLabel>
                            <FormGroup>
                            <FormControlLabel
                                control={
                                <Checkbox checked={false} name="exceptional" sx={{'& .MuiSvgIcon-root': { fontSize: 20 },py:0}} />
                                }
                                label="9+ Exceptional"
                                componentsProps={
                                    {
                                        typography: {fontSize:'14px',},
                                    }
                                }
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={false} name="excellent" sx={{'& .MuiSvgIcon-root': { fontSize: 20 },py:0}} />
                                }
                                label="8-9 Excellent"
                                componentsProps={
                                    {
                                        typography: {fontSize:'14px',},
                                    }
                                }
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={false} name="veryGood" sx={{'& .MuiSvgIcon-root': { fontSize: 20 },py:0}} />
                                }
                                label="7-8 Very Good"
                                componentsProps={
                                    {
                                        typography: {fontSize:'14px',},
                                    }
                                }
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={false} name="good" sx={{'& .MuiSvgIcon-root': { fontSize: 20 },py:0}} />
                                }
                                label="6-7 Good"
                                componentsProps={
                                    {
                                        typography: {fontSize:'14px',},
                                    }
                                }
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={false} name="below" sx={{'& .MuiSvgIcon-root': { fontSize: 20 },py:0}} />
                                }
                                
                                label="<6 Below Expectation"
                                componentsProps={
                                    {
                                        typography: {fontSize:'14px',},
                                    }
                                }
                            />
                            </FormGroup>
                        </FormControl>
                        <FormControl sx={{ m: 2 }} size='small' component="fieldset" variant="standard">
                            <FormLabel sx={{fontSize:'12px',mb:1}} component="legend"><b>Time of the year</b></FormLabel>
                            <FormGroup>
                            <FormControlLabel
                                control={
                                <Checkbox checked={false} name="martomay" sx={{'& .MuiSvgIcon-root': { fontSize: 20 },py:0}} />
                                }
                                label="Mar - May "
                                componentsProps={
                                    {
                                        typography: {fontSize:'14px',},
                                    }
                                }
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={false} name="juntoaug" sx={{'& .MuiSvgIcon-root': { fontSize: 20 },py:0}} />
                                }
                                label="Jun - Aug"
                                componentsProps={
                                    {
                                        typography: {fontSize:'14px',},
                                    }
                                }
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={false} name="septonov" sx={{'& .MuiSvgIcon-root': { fontSize: 20 },py:0}} />
                                }
                                label="Sep - Nov"
                                componentsProps={
                                    {
                                        typography: {fontSize:'14px',},
                                    }
                                }
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={false} name="dectofeb" sx={{'& .MuiSvgIcon-root': { fontSize: 20 },py:0}} />
                                }
                                label="Dec - Feb"
                                componentsProps={
                                    {
                                        typography: {fontSize:'14px',},
                                    }
                                }
                            />
                            </FormGroup>
                        </FormControl>
                    </Box>
                </Box>
                <ReviewDetails property={props.property.id} reviews={props.reviews} setReviews={props.setReviews} />
            </Box>
        </Paper>
    )
}
export default PropertyReviews
