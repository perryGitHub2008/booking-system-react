import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import IconButton from '@mui/material/IconButton';
import {useEffect, useRef, useState} from 'react'
import './NoScrollBar.css';
import './PopularDest.css'
import ImportImage from './importImage.js'
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

function PopularDest (){
    const bannerElRef = useRef();
    const [scrollerY, setScrollerY] = useState(0)
    const cityAccommodations = [
                                {city:'Kuala Lumpur', accommodation:'12,080'},
                                {city:'Las Vegas (NV)', accommodation:'765'},
                                {city:'Penang', accommodation:'3,630'},
                                {city:'Los Angeles (CA)', accommodation:'3,018'},
                                {city:'Malacca', accommodation:'3,522'},
                                {city:'Orlando (FL)', accommodation:'11,313'},
                                {city:'Johor Bahru', accommodation:'4,107'},
                                {city:'Jakarta', accommodation:'8,421'},
                                {city:'Manila', accommodation:'6,965'},
                                {city:'Bangkok', accommodation:'10,799'},
                                {city:'Dallas (TX)', accommodation:'1,366'},
                                {city:'Kota Kinabalu', accommodation:'2,135'},
                                {city:'Singapore', accommodation:'1,287'},
                                {city:'New York (NY)', accommodation:'2,365'},
                                {city:'Boracay Island', accommodation:'902'},
                                {city:'Ipoh', accommodation:'1,235'},
                                {city:'Phoenix (AZ)', accommodation:'2,475'}]
    const scrollRight = () => {
        if(scrollerY+908>=bannerElRef.current.scrollWidth){
            setScrollerY(bannerElRef.current.scrollWidth-908)
        } else {
          setScrollerY(scrollerY+908)
        }
    }
    const scrollLeft = () => {

        if(scrollerY-908<=0){
            setScrollerY(0)
        } else {
            setScrollerY(scrollerY-908)
        }
    }
    useEffect(()=>{
        bannerElRef.current.scrollTo({left:scrollerY, behavior: 'smooth'})

    },[scrollerY])

    const bannerImages = ImportImage(require.context('./CityImage', false, /-enable\.(png|jpe?g|svg)$/));
  
    const cityImageList = cityAccommodations.map((city,index)=>{
        return (
            <>
            <Paper elevation={0}>
                <Box height={140}>
                    <Avatar alt="" className="city-image" src={bannerImages[index]} sx={{mx:'auto',width:'134px', height:'134px', zIndex:'0'}}/>
                </Box>
                <Typography align="center" component="div" width={140} px='-6px'>
                    <Typography gutterBottom  variant="body1" >
                        {city.city}
                    </Typography>
                    <Typography sx={{fontSize:'xx-small'}}>
                        {city.accommodation} Accommondation
                    </Typography>
                </Typography>
            </Paper>
            </>
        );
    })
    return(
        <>
            <Box sx={{mx: "auto", width: 910 }}>
                <Typography gutterBottom align="center" variant="h5" component="div" mt={10}>
                    Popular destinations outside Hong Kong SAR, China
                </Typography>
                <Box sx={{background:'black'}}>
                <IconButton onClick={scrollLeft} sx={{position:'absolute',ml:-6,mt:'55px'}}  aria-label="upload picture" component="span">
                    <ArrowCircleLeftIcon fontSize="large" sx={{ boxShadow: '2px 2px 16px rgba(0, 0, 0, 0.5)',borderRadius:'50%', zIndex:'99999999999999'}}/> 
                </IconButton>
                <IconButton  onClick={scrollRight} sx={{position:'absolute',ml:'910px',mt:'55px'}}  aria-label="upload picture" component="span">
                    <ArrowCircleRightIcon fontSize="large"  sx={{boxShadow: '2px 2px 16px rgba(0, 0, 0, 0.5)',borderRadius:'50%', zIndex:'99999999999999'}}/> 
                </IconButton></Box>
                <Box
                    className='Banner'
                    sx={{
                        display: 'flex',
                        overflowX: 'scroll',
                        paddingBottom: '15px',
                        height: '200px',
                        '& > :not(style)': {
                        mx: 3,
                        mt: 1,

                        }
                    }}
                    ref={bannerElRef}
                >        
                {cityImageList}
                </Box>
            </Box>      
        </>
    );
}

export default PopularDest;