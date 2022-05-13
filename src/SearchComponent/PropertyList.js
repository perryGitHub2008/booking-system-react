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
import hotel3 from './HotelImage/254048767.jpg'
import hotel4 from './HotelImage/a56dffde46736eb24ff1c696a507e660.jpg'
import hotel5 from './HotelImage/265070656.jpg'
import hotel6 from './HotelImage/hotel6.jpg'
import hotel8 from './HotelImage/hotel9.jpg'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './PropertyList.css'
import {useLocation} from "react-router-dom";
import {useMemo, useState} from 'react'
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Slider from '@mui/material/Slider';

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

function PropertyList(){
    let query = useQuery();
    const [img, setImg] = useState('')
    const properties = [
        {name:'The Hari Hong Kong', 
        star:5, 
        address:'Wanchai, Hong Kong - 1.6 km to center',
        country:'HK',
        price:'2301', 
        discount:55, 
        rating:[9,8.5,8.5,8.4,8.4], 
        image:[{img:hotel1, title:'1', rows:4, cols:4},
                {img:hotel2, title:'1',},
                {img:hotel3, title:'1',},
                {img:hotel4, title:'1',},
                {img:hotel5, title:'1',}
            ],
        review:9975},
        {name:'Hyatt Centric Victoria Harbour', 
        star:5, 
        address:'North Point, Hong Kong - 2.1 km to center',
        country:'HK',
        price:'2301', 
        discount:55, 
        rating:[9.2,8.3,8.7,9.3,8.6], 
        image:[{img:hotel6, title:'1', rows:4, cols:4},
                {img:hotel2, title:'1',},
                {img:hotel8, title:'1',},
                {img:hotel3, title:'1',},
                {img:hotel4, title:'1',}
            ],
        review:867},
        {name:'Hyatt Centric Victoria Harbour', 
        star:5, 
        address:'North Point, Hong Kong - 2.1 km to center',
        country:'JP',
        price:'2301', 
        discount:55, 
        rating:[9.2,8.3,8.7,9.3,8.6], 
        image:[{img:hotel6, title:'1', rows:4, cols:4},
                {img:hotel2, title:'1',},
                {img:hotel8, title:'1',},
                {img:hotel3, title:'1',},
                {img:hotel4, title:'1',}
            ],
        review:867},]

    const ratingTitle=['Cleanliness', 'Factilitites', 'Location', 'Service', 'Value for money']
    const totalTraveler =()=>{
        const adults = []
        properties.map((property)=>{
            return(
            adults.push( property.rating.reduce((prev, curr)=>{
                return prev + curr},0))
        )})
        return adults

    }

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
        <Tooltip placement="top-start" {...props} classes={{ popper: className }} />
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
        console.log(img)
    }
    return (
        properties.map((property,index) => {
            if(property.country === query.get("country")) {
            return(
                <Grid container 
                    justifyContent="center"
                    alignItems="center"
                    sx={{mt:2}}
                    >
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6} sx={{zIndex:'1'}}>
                        <Card className="property-list" sx={{display: 'flex'}}>
                            <ImageList
                            sx={{width: 273, height: 221, m:0}}
                            variant="quilted"
                            cols={4}
                            rowHeight={41}
                            >
                                {property.image.map((imageItem,index)=>{
                                    if(imageItem.rows === 4){
                                        return(
                                            <ImageListItem
                                            key={imageItem.img}
                                            cols={imageItem.cols || 1}
                                            rows={imageItem.rows || 1}
                                            >
                                            <img
                                                {...srcset(imageItem.img, 182, imageItem.rows, imageItem.cols)}
                                                alt={imageItem.title}
                                                loading="lazy"
                                            />
                                            </ImageListItem>
                                        );
                                    } else {
                                        return(
                                            <ImageTooltip
                                                title={
                                                    <img
                                                        {...srcset(img, 182, imageItem.rows, imageItem.cols)}
                                                        width='270px'
                                                        height='176px'
                                                        alt={imageItem.title}
                                                        loading="lazy"
                                                    />
                                                }>
                                                    <ImageListItem
                                                    key={imageItem.img}
                                                    cols={imageItem.cols || 1}
                                                    rows={imageItem.rows || 1}
                                                    >
                                                    <img
                                                        {...srcset(imageItem.img, 182, imageItem.rows, imageItem.cols)}
                                                        alt={imageItem.title}
                                                        loading="lazy"
                                                        onMouseOver={()=>handleImageHover(imageItem.img)}
                                                    />
                                                    
                                                    </ImageListItem>
                                                </ImageTooltip>
                                        );
                                    }
                                })}
                            </ImageList>
                            <Box sx={{ display: 'flex', flexDirection: 'column',width:'450px'}}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {property.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex'}}>
                                        <Rating name="readOnly" value={property.star} readOnly size='small' />
                                        <AddLocationIcon color="primary" fontSize="small"/>
                                        <Typography  variant="caption" color="text.secondary">
                                            {property.address}
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
                                <ReviewTooltip
                                    title={
                                        <Card sx={{ minWidth: 400 }}>
                                            <CardContent>
                                                <Grid container>
                                                    {property.rating.map((rate,index)=>{
                                                        return(
                                                            <Grid item xs={5.5} sx={{ml:1}}>
                                                                <Slider
                                                                size="small"
                                                                value={rate}
                                                                aria-label="Small"
                                                                valueLabelDisplay="auto"
                                                                min={0}
                                                                max={10}
                                                                step={0.1}
                                                                />
                                                                <TinyText>
                                                                    <TinyText2>{ratingTitle[index]}</TinyText2>
                                                                    {rate}
                                                                </TinyText>
                                                            </Grid>
                                                        );
                                                    })}
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    }
                                >
                                    <Grid item xs={1} sx={{display: 'flex'}}>
                                    
                                    
                                        
                                        <Typography variant="caption" component='div' sx={{textAlign:'end'}}>
                                            <b>{totalTraveler()[index]>8 ? `Excellent`:'Very Good'}</b>
                                            <br></br>
                                            <Typography  variant="caption" color="text.secondary">
                                                {property.review} reviews
                                            </Typography>
                                        </Typography>
                                        

                                        <Avatar sx={{ml:1, width: 30, height: 30, bgcolor: blue[600]}}>
                                            <Typography  variant="caption" color="white">
                                                {(totalTraveler()[index]/5).toPrecision(2)}
                                            </Typography>
                                        </Avatar>
                                    
                                    </Grid>
                                </ReviewTooltip>       
                                <Grid item xs={3}></Grid>
                                <Grid item xs={1}>
                                    <Typography  variant="h6" color="text.secondary">
                                        HKD {property.price}
                                    </Typography>
                                    
                                </Grid>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={1}>
                                    <Button variant="contained">
                                        Select room <ArrowForwardIosIcon/>
                                    </Button>
                                </Grid>
                            </Grid>
                            
                        </Card>
                    </Grid>
                </Grid>
            );
            }
            return null;
        })

    );
}

export default PropertyList;

