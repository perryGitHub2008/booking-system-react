import React from 'react';
import Paper from '@mui/material/Paper';
import { Box, Typography} from '@mui/material';
import { blue,green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { makeStyles } from '@mui/styles';

import ReviewSnippet from './ReviewSnippet';


function OverviewReviews(props){

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

    const useStyles = makeStyles({
        paper: {
            margin:'3px',
            display:'flex',
            padding:'5px',
        },
    })

    const ReviewTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
        ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
            maxWidth: 500
        },
    }));
    const TinyText = styled(Typography)({
        fontSize: '1rem',
        fontWeight: 500,
        letterSpacing: 0.2,
        display:'flex'
    });
    const TinyText2 = styled(Typography)({
        fontSize: '1rem',
        fontWeight: 500,
        letterSpacing: 0.2,
        width:'90%'
    });
    return (
        <Paper sx={{width:'100%',float:'right'}} variant="outlined">
            <Box sx={{p:'16px'}}>
                <ReviewTooltip
                    title={
                        <Card sx={{ minWidth: 400 }}>
                            <CardContent>
                                <Box sx={{display:'flex', flexWrap:'wrap'}}>
                                    {reviewTitle.map((review,index)=>{
                                        return (
                                            <Box sx={{width:'45%', mx:1}}>
                                                <Slider
                                                    size="small"
                                                    value={parseFloat(review.value.toPrecision(2))}
                                                    aria-label="Small"
                                                    valueLabelDisplay="auto"
                                                    min={0}
                                                    max={10}
                                                    step={0.1} />
                                                <TinyText>
                                                    <TinyText2>{review.name}</TinyText2>
                                                    {review.value.toPrecision(2)}
                                                </TinyText>
                                            </Box>
                                        )
                                    })}
                                </Box>
                            </CardContent>
                        </Card>
                    }
                >
                    <Box sx={{display: 'flex'}}>
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
                            <br></br>
                            <Typography color="text.secondary">
                                {props.property.totalReview} reviews
                            </Typography>
                        </Typography>
                    </Box>
                </ReviewTooltip> 
                <Box sx={{mt:1, display:'flex', flexFlow:'row wrap', fontSize:'12px'}}>
                    <Paper className={useStyles().paper} variant="outlined">View<div style={{paddingLeft:2,color:green[600]}}>123</div><ThumbUpAltIcon sx={{color:green[600]}} fontSize="12px"/></Paper>
                    <Paper className={useStyles().paper} variant="outlined">Housekeeping<div style={{paddingLeft:2,color:green[600]}}>123</div><ThumbUpAltIcon sx={{color:green[600]}}  fontSize="12px"/></Paper>
                    <Paper className={useStyles().paper} variant="outlined">Breakfast<div style={{paddingLeft:2,color:green[600]}}>123</div><ThumbUpAltIcon sx={{color:green[600]}}  fontSize="12px"/></Paper>
                </Box>
                <ReviewSnippet property={props.property} reviews={props.reviews}/>  
            </Box> 
        </Paper>
    )
}
export default OverviewReviews
