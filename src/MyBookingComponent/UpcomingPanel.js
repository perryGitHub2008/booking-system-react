import { Box,  Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import hotel1 from '../SearchComponent/HotelImage/7437_15081117200034063157.jpg'
import { Rating, CardContent, Divider } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
function UpcomingPanel() {

    const [loading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const [mybookingData, setMybookingData] = useState("");
    const [page, setPage] = useState(1);
    function srcset(image, size, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${
                size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
        };
    }
    function timeToDate(time) {
        return new Date(time);
    }

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const {data:rs} = await axiosPrivate.get(`/booking/mybooking/uncoming?page=${page}`, {withCredentials:true})
                setMybookingData(rs);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    },[page])

    const [searchValue, setSearchValue] = useState("")
    return (
        <Box sx={{ mt:2,width:'100%'}}>
            <Box>
                <Stack spacing={2} sx={{width:'45%', display:'inline-block'}}>
                    <Pagination count={mybookingData.totalPages} page={page} variant="outlined" shape="rounded" onChange={(event,value)=> setPage(value)}/>
                </Stack>
                <Box sx={{float:"right"}}>
                    <TextField
                        id="bookingId"
                        label="Booking ID"
                        value={searchValue}
                        onChange={(event)=>setSearchValue(event.target.value)}
                        size="small"

                    />
                    <Button>
                        Search
                    </Button>
                    <Button onClick={()=>setSearchValue("")}>
                        Clear
                    </Button>
                </Box>
            </Box>
            {
                !loading && mybookingData!=="" && (
                    mybookingData.mybookings.map((booking)=>{
                        return (
                            <Card sx={{display: 'flex', width:"100%", mt:3}}>
                                <img
                                    {...srcset(hotel1, 182, 4, 4)}
                                    alt={hotel1}
                                    loading="lazy"
                                    style={{width: 180, m:0}}
                                />
                                <CardContent sx={{ flex: '1 0 auto'}}>
                                    <Typography component="div" variant="h5" sx={{display:'inline-block'}}>
                                        {booking.propertyName}
                                    </Typography>
                                    <Rating name="readOnly" value={booking.star} readOnly size='small' sx={{ml:1}} />
                                    <Box sx={{float:"right", height:"100px", display:"flex"}}>
                                        <Box sx={{px:1, width:'80px'}} style={{textAlign: 'center'}} >
                                            <Typography component="div" variant='caption'>Check In</Typography>
                                            <Typography component="div" variant='h3'>{timeToDate(booking.checkInDate).getDate().toString()}</Typography>
                                            <Typography component="div">{timeToDate(booking.checkInDate).toLocaleString('default', {month:'long'}).toString()}</Typography>
                                        </Box>
            
                                        <Divider orientation="vertical"/>
                                        <Box sx={{px:1, width:'80px'}} style={{textAlign: 'center'}} >
                                            <Typography component="div" variant='caption'>Check Out</Typography>
                                            <Typography component="div" variant='h3'>{timeToDate(booking.checkOutDate).getDate().toString()}</Typography>
                                            <Typography component="div">{timeToDate(booking.checkOutDate).toLocaleString('default', {month:'long'}).toString()}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex'}}>
                                        <AddLocationIcon color="primary" fontSize="small"/>
                                        <Typography  variant="caption" color="text.secondary">
                                            {booking.address}, {booking.area}
                                        </Typography>
                                    </Box>
                                    <Typography component="div" variant="caption" color="text.secondary">
                                        Booking number: {booking.orderId}
                                    </Typography>
                                    <Typography component="div" variant="caption" color="text.secondary">
                                        Price {booking.amount}
                                    </Typography>
            
                                </CardContent>
            
                            </Card>
                        )
                        
                    })
                )
            }
        </Box>
    )
}

export default UpcomingPanel