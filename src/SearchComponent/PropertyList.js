import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import hotel1 from './HotelImage/7437_15081117200034063157.jpg'
import hotel2 from './HotelImage/21211583ed575afea1b20b5f27bfc090.jpg'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './PropertyList.css'
import {useLocation} from "react-router-dom";
import {useEffect, useMemo, useState} from 'react'
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import{Link} from 'react-router-dom'
import SearchView from './SearchView';
import Loading from '../Loading';
import moment from 'moment';
import axios from '../Service/api';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}


function PropertyList(){
    function useQuery() {
        const { search } = useLocation();
    
        return useMemo(() => new URLSearchParams(search), [search]);
    }
    const query = useQuery();
    const quest = query.get("adult")/query.get("room")
    const adult = query.get("adult")
    const room = query.get("room")
    const country = query.get("country")
    const checkin = query.get("checkin")
    const checkout = query.get("checkout")
    const [img, setImg] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);
    const [propertiess, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page,setPage] = useState(1)
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                await new Promise(f => setTimeout(f, 2000));
                const formatCheckIn = moment(checkin).format('DD-MM-YYYY');
                const formatCheckOut = moment(checkout).format('DD-MM-YYYY');
                const {data: response} = await axios.get(`/property/searchHotelByCity/${quest}/${room}/${country}/${formatCheckIn}/${formatCheckOut}`,{responseType: "json"});
                setProperty(response);
                console.log(response)
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
          }
      
          fetchData();
    },[loading])

    const priceList = (array) =>{
        return array.map((item)=>{
            return item.price;
        })
    }

    const rating = (array)=>{
        return array.reduce((prev,curr)=>{
            return prev + curr.cleanliness
                        + curr.facilities
                        + curr.location
                        + curr.room
                        + curr.service
                        + curr.value
        },0)
    }
    const ratingTitle=['Cleanliness', 'Factilitites', 'Location', 'Service', 'Value for money']

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
    const ImageTooltip = styled(({ className, ...props }) => (
        <Tooltip placement="right" {...props} 
                classes={{ popper: className }} 
                PopperProps={{
                    anchorEl:anchorEl,
                }}
            />
        ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
            maxWidth: 500,
        },
        
    }));
    const TinyText = styled(Typography)({
        fontSize: '0.75rem',
        opacity: 0.7,
        fontWeight: 500,
        letterSpacing: 0.2,
        display:'flex'
    });
    const TinyText2 = styled(Typography)({
        fontSize: '0.75rem',
        opacity: 0.7,
        fontWeight: 500,
        letterSpacing: 0.2,
        width:'90%'
    });
    const handleImageHover = (image) => {
        setImg(image)
    }
    const handleImageListHover = () => (event)=>{
        setAnchorEl(event.currentTarget)

    }


    return (
        <>
        <SearchView setLoading={setLoading}/>
        <Box sx={{ width: 1200, mt: 2, marginLeft: 'auto', marginRight: 'auto' }}>
            {loading ? 
            (<Loading text={"We'll match any price on the web, or refund the difference"}/>):(
                propertiess.property.length!==0 ? (
                    <>
                    {propertiess.property.map((property,index) => {
                        return(
                            <Card className="property-list" sx={{display: 'flex', width:1200, mt:2, float: 'right'}}>
                                <ImageList
                                sx={{width: 273, height: 221, m:0}}
                                variant="quilted"
                                cols={4}
                                rowHeight={41}
                                onMouseOver={handleImageListHover()}

                                >
                                <ImageListItem
                                key={hotel1}
                                cols={4 || 1}
                                rows={4 || 1}
                                
                                >
                                <img
                                    {...srcset(hotel1, 182, 4, 4)}
                                    alt={hotel1}
                                    loading="lazy"
                                />
                                </ImageListItem>

                                <ImageTooltip
                                
                                    title={
                                        <img
                                            {...srcset(img, 182, 1, 1)}
                                            width='270px'
                                            height='176px'
                                            alt={hotel1}
                                            loading="lazy"
                                            onMouseOver={()=>handleImageHover()}

                                        />
                                    }>
                                    <ImageListItem
                                    key={hotel1}
                                    cols={1 || 1}
                                    rows={1 || 1}
                                    >
                                    <img
                                        {...srcset(hotel1, 182, 1, 1)}
                                        alt={hotel1}
                                        loading="lazy"
                                        onMouseOver={()=>handleImageHover(hotel1)}
                                    />
                                    
                                    </ImageListItem>
                                </ImageTooltip>
                                <ImageTooltip
                                    title={
                                        <img
                                            {...srcset(img, 182, 1, 1)}
                                            width='270px'
                                            height='176px'
                                            alt={hotel2}
                                            loading="lazy"
                                            onMouseOver={()=>handleImageHover()}

                                        />
                                    }>
                                    <ImageListItem
                                    key={hotel2}
                                    cols={1 || 1}
                                    rows={1 || 1}
                                    >
                                    <img
                                        {...srcset(hotel2, 182, 1, 1)}
                                        alt={hotel2}
                                        loading="lazy"
                                        onMouseOver={()=>handleImageHover(hotel2)}
                                    />
                                    
                                    </ImageListItem>
                                </ImageTooltip>
                                </ImageList>
                                <Box sx={{ display: 'flex', flexDirection: 'column',width:'800px'}}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5">
                                            {property.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex'}}>
                                            <Rating name="readOnly" value={property.star} readOnly size='small' />
                                            <AddLocationIcon color="primary" fontSize="small"/>
                                            <Typography  variant="body2" color="text.secondary">
                                                {property.address}, {property.area}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Box>
                                <Divider orientation="vertical" flexItem />
                                
                                <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-end"
                                sx={{width:'225px',mr:1}}>
                                    {/*
                                    <ReviewTooltip
                                        title={
                                            <Card sx={{ minWidth: 400 }}>
                                                <CardContent>
                                                    <Grid container>
                                                        <Grid item xs={5.5} sx={{ml:1}}>
                                                            <Slider
                                                            size="small"
                                                            value={9}
                                                            aria-label="Small"
                                                            valueLabelDisplay="auto"
                                                            min={0}
                                                            max={10}
                                                            step={0.1}
                                                            />
                                                            <TinyText>
                                                                <TinyText2>{ratingTitle[0]}</TinyText2>
                                                                {9}
                                                            </TinyText>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        }
                                    >
                                    */}
                                        <Grid item xs={1} sx={{display: 'flex',mt:0.5}}>
                                            <Typography variant="body2" component='div' style={{textAlign:'end'}}>
                                                <b>{rating(property.reviews)/(property.totalReview*6).toPrecision(2)>8 ? `Excellent`:'Very Good'}</b>
                                                <br></br>
                                                <Typography  variant="overline" color="text.secondary">
                                                    {property.totalReview>0 ?property.totalReview: "No"} reviews
                                                </Typography>

                                            </Typography>
                                            

                                            <Avatar sx={{ml:1, width: 40, height: 40, bgcolor: blue[600]}}>
                                                <Typography  variant="subtitle1" color="white">
                                                    {property.reviews.length>0 &&(rating(property.reviews)/(property.totalReview*6)).toPrecision(2)}
                                                </Typography>
                                            </Avatar>
                                        
                                        </Grid>
                                    {/*</ReviewTooltip>*/}       
                                    <Grid item xs={3}></Grid>
                                    <Grid item xs={1}>
                                        <Typography  variant="h5" color="text.secondary">
                                            HKD {Math.min(...priceList(property.offer))}
                                        </Typography>
                                        
                                    </Grid>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={0.5}>
                                        <Button 
                                            variant="contained"
                                            component={Link} 
                                            to={{
                                                pathname: `/property-details?propertyid=${property.id}&room=${room}&adult=${adult}&checkin=${checkin}&checkout=${checkout}`,
                                            }}
                                            state={{offer:property.offer}}

                                        >
                                            Select room <ArrowForwardIosIcon/>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        )
                    })}
                    <Box sx={{display:'flex', justifyContent:'center',width:'100%'}}>
                        <Stack spacing={2} sx={{ width:'fit-content',pt:2,mb:3}}>
                            <Pagination count={propertiess.totalPages} page={1} variant="outlined" shape="rounded" onChange={(event,value)=>setPage(value)}/>
                        </Stack>
                    </Box>
                    </>
                ) : (<Typography sx={{width:'80%',mx:'auto'}}>We couldn't find any results that match your search criteria. Please modify your search and try again.</Typography>)
            )}

        </Box>
        </>
        );
}

export default PropertyList;

