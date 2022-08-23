import React from 'react';
import { Box, Divider, Link, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { blue, grey } from '@mui/material/colors';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CountryList from '../CountryList';
import reviewService from '../Service/reviewService';
import {useEffect, useState} from 'react';
function ReviewDetails(props){
    const [page, SetPage] = useState(1);
    const [sortby, setSortBy] = useState(1)
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const {data: reviews} = await reviewService.getReviews(props.property,page-1);
                props.setReviews(reviews);

            } catch (error) {
              console.error(error.message);
            }
          }
      
          fetchData();
    },[page])

    const sortBy = (event) =>{
        if(event.target.value === 1){
            setSortBy(1)
            props.reviews.reviews.sort((prev, curr)=>{
                return curr.createdat - prev.createdat;
            })
        } else if(event.target.value === 2){
            setSortBy(2)
            props.reviews.reviews.sort((prev, curr)=>{
                return (curr.cleanliness + curr.facilities
                        +curr.location + curr.room
                        +curr.service + curr.value)/6 
                        - 
                        (prev.cleanliness + prev.facilities
                        +prev.location + prev.room
                        +prev.service + prev.value)/6;
            })
        } else if(event.target.value === 3){
            setSortBy(3)
            props.reviews.reviews.sort((prev, curr)=>{
                return  (prev.cleanliness + prev.facilities
                        +prev.location + prev.room
                        +prev.service + prev.value)/6
                        -
                        (curr.cleanliness + curr.facilities
                        +curr.location + curr.room
                        +curr.service + curr.value)/6;
            })
        }
    }

    const handlePageChange = (event, number) => {
        SetPage(number)
    };
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

    const options = { year: 'numeric', month: 'long'};

    return (
        <Box sx={{m:2, mt:4,width:'100%'}}>
            <Box>
                <Typography variant="body2" sx={{display:'inline-block'}} component="div">
                Showing 1,469 verified guest comments <Link underline='hover' component='button'>Clear all filters</Link>
                </Typography>
                <Box sx={{display:'inline-block', float:"right"}}>
                    <FormControl size="small">
                        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sortby}
                                displayEmpty
                                label="Sort by"
                                onChange={sortBy}
                            >
                                <MenuItem value={1}>Most recent</MenuItem>
                                <MenuItem value={2}>Rating, high to low</MenuItem>
                                <MenuItem value={3}>Rating, low to high</MenuItem>
                            </Select>
                    </FormControl>
                </Box>
            </Box>
            <Box sx={{ width:'35%',mt:6,mb:3,marginLeft: 'auto', marginRight: 'auto'}}>
                <Stack spacing={2}>
                    <Pagination count={props.reviews.totalPages} page={page} variant="outlined" shape="rounded" onChange={handlePageChange}/>
                </Stack>
            </Box>
            <Divider/>
            {props.reviews.reviews.map((review,index)=>{
                return (
                    <Box key={index} sx={{ display: 'flex', m: 2 }}>
                        <Box sx={{width:240, p:3}}>
                            <Typography sx={{ display: 'inline-block', color: blue[500] }} variant="h4" component="div">
                                {((review.cleanliness
                                    + review.facilities
                                    + review.location
                                    + review.room
                                    + review.service
                                    + review.value) / 6).toPrecision(2)}
                                <Typography sx={{ display: 'inline-block', ml: 2 }} variant="body1" component="div">
                                    {ratingEng(((review.cleanliness
                                        + review.facilities
                                        + review.location
                                        + review.room
                                        + review.service
                                        + review.value) / 6).toPrecision(2))}
                                </Typography>
                            </Typography>
                            <Typography variant="caption" component="div">
                                <b>{review.firstname}</b> from {CountryList.searchByMobileCode(review.countrycode).name}
                            </Typography>
                            <Typography variant="caption" component="div">
                                <CardTravelIcon sx={{ marginRight: '8px', fontSize: '16px' }} />
                                {review.guest} Guests
                            </Typography>
                            <Typography variant="caption" component="div">
                                <CalendarTodayIcon sx={{ marginRight: '8px', fontSize: '16px' }} />
                                Stayed {(new Date(review.checkout * 1000).getTime()-new Date(review.checkin * 1000).getTime())/(1000*3600*24)} nights 
                                at {new Intl.DateTimeFormat('en-US', options).format(new Date(review.checkin * 1000))}
                            </Typography>
                        </Box>
                        <Box sx={{ backgroundColor: grey[300], borderRadius: '10px', ml: 2, width: '100%' }}>
                            <Box sx={{ m: 3, mx: 4 }}>
                                <Typography sx={{ display: 'inline-block' }} variant="h5" component="div">
                                    "<b>{review.title}</b>"
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1 }} component="div">
                                    {review.content}
                                </Typography>
                                <Typography variant="caption" sx={{ mt: 3 }} component="div">
                                    Reviewed {new Date(review.createdat * 1000).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )
            })}
            <Box sx={{ width:'35%',mt:8,mb:3,marginLeft: 'auto', marginRight: 'auto'}}>
                <Stack spacing={2}>
                    <Pagination count={props.reviews.totalPages} page={page} variant="outlined" shape="rounded" onChange={handlePageChange}/>
                </Stack>
            </Box>
        </Box>
    )
}
export default ReviewDetails
