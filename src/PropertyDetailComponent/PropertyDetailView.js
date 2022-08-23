import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { useState, useRef, useEffect, useMemo } from 'react';
import Modal from '@mui/material/Modal';
import Map from './Map';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import PropertyGallery from './PropertyGallery';
import PropertyOverview from './PropertyOverview';
import PropertyRooms from './PropertyRooms';
import PropertyReviews from './PropertyReviews';
import { AppBar, Toolbar } from '@mui/material';
import {useLocation} from "react-router-dom";
import PropertyDetail from './PropertyDetail';
import Loading from '../Loading';
import axios from '../Service/api';

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

function PropertyDetailView(props){
    let query = useQuery();
    const location = useLocation();
    const [openModal, setOpenModal] = useState(false);
    const [value, setValue] = useState(0);
    const overviewRef = useRef(null);
    const roomRef = useRef(null);
    const reviewRef = useRef(null);
    const hotelNavRef = useRef(null);
    const [isVisible, setIsVisible] = useState('hidden');
    const [property, setProperty] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [appBarStyle, setAppBarStyle] = useState()
    const menuRef = useRef(null)
    const [room, setRoom] = useState({Adults:query.get("adult"),Room:query.get("room")});
    const [checkInOut, setCheckInOut] = useState([query.get("checkin"), query.get("checkout")]);

    useEffect(()=>{
        const fetchData = async () =>{
            try {
                await new Promise(f => setTimeout(f, 2000));
                const {data: property} = await axios.get(`/property/getProperty/${query.get("propertyid")}`,{withCredentials: true})
                setProperty(property);
                const {data: reviews} = await axios.get(`/review/getReviews/${query.get("propertyid")}?page=${0}`)
                setReviews(reviews);
                reviews.reviews.sort((prev, curr)=>{
                    return curr.createdat - prev.createdat;
                })
            } catch (error) {
              console.error(error.message);
            }
            setLoading(false);
          }
      
          fetchData();
    },[loading])

    useEffect(() => {   
        window.addEventListener("scroll", listenToScroll);
        return () => 
           window.removeEventListener("scroll", listenToScroll); 
    },[])
    const listenToScroll = () => {
        let hotelNav = hotelNavRef.current.offsetTop-85;
        let searchNav = menuRef.current.offsetTop;
        const winScroll = document.body.scrollTop || 
            document.documentElement.scrollTop;
           
        if (winScroll > hotelNav) {  
            if(winScroll>= overviewRef.current.offsetTop-150 && winScroll <= roomRef.current.offsetTop-150){
                setValue(0)
            } else if (winScroll>= roomRef.current.offsetTop-150 && winScroll <= reviewRef.current.offsetTop-150){
                setValue(1)
            } else if (winScroll>= reviewRef.current.offsetTop-150){
                setValue(2)
            }
             setIsVisible('visible');
        } else {
             setIsVisible('hidden');
             setValue(null)
        }  

        if(winScroll > searchNav){
            setAppBarStyle({position:'fixed',top:0})
        } else {
            setAppBarStyle()
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch(newValue){
            case 0:
                handleScroll(overviewRef);
                break;
            case 1:
                handleScroll(roomRef);
                break;
            case 2:
                handleScroll(reviewRef)
                break;
            default:
        }

    }
    const handleScroll = (ref) => {
        window.scrollTo({
            top: ref.current.offsetTop-140,
            left: 0,
            behavior: "smooth",
        });
    };

    const setRoomCallback = (room) =>{
        setRoom(room)
    }
    const setCheckInOutCallback = (date) =>{
        setCheckInOut(date)
    }

    return(
        <>
        <PropertyDetail appBarStyle={appBarStyle} menuRef={menuRef} setRoomCallback={setRoomCallback} setCheckInOutCallback={setCheckInOutCallback} room={room} checkInOut={checkInOut}/>
        {
            loading ? (<Loading text={"We'll match any price on the web, or refund the difference"}/>):(
                <Box sx={{width:1080, mt:2, marginLeft: 'auto', marginRight: 'auto'}}>
                    <Box sx={{height:50,width:'100%',position:'fixed',top:'70px',left:0,zIndex:1000,visibility:isVisible}}>  
                        <AppBar position="relative"
                            color='transparent'
                        >
                        <Toolbar variant="dense"
                            sx={{ py: 1, background: '#fff' }}
                        >             
                                <Tabs sx={{width:1080,marginLeft:'auto',marginRight:'auto'}} value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Overview"  />
                                    <Tab label="Rooms" />
                                    <Tab label="Reviews"  />
                                </Tabs>
                            </Toolbar>
                        </AppBar>
                    </Box>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '12px' }}>
                        <Link color="inherit" href="/">
                            Home
                        </Link>
                        <Link
                            color="inherit"
                        >
                            {property.state}, {property.city} Hotels
                        </Link>
                        <Link
                            color="inherit"
                        >
                            {property.city} Hotels
                        </Link>
                        <Typography sx={{ fontSize: '12px' }} color="text.primary">{property.name}</Typography>
                    </Breadcrumbs>
                    <Box sx={{ display: 'flex', mt:1.5}}>
                        <Typography variant='h5' color="text.primary">{property.name}
                            <Rating sx={{ ml: 1, fontSize: 18 }} name="read-only" value={parseInt(property.star)} readOnly />
                        </Typography>
                    </Box>
                    <Link 
                        component="button"
                        sx={{ fontSize: '12px' }}
                        color="text.primary"
                        onClick={() => {
                            setOpenModal(true);
                        }}>
                        {property.address}, {property.area}, {property.city}, {property.state}, {property.country} - SEE MAP
                    </Link>
                    <PropertyGallery/>
                    <Paper sx={{ width: '100%', mt: 2 }} variant="outlined" ref={hotelNavRef}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Overview"  />
                            <Tab label="Rooms" />
                            <Tab label="Reviews"  />
                        </Tabs>
                    </Paper>
                    <PropertyOverview property={property} reviews={reviews} refProp={overviewRef} />
                    <PropertyRooms refProp={roomRef} property={property} room={room} checkInOut={checkInOut} offer={location.state.offer}/>
                    <PropertyReviews refProp={reviewRef} property={property} reviews={reviews} setReviews={setReviews} />
                    <Modal
                        open={openModal}
                        onClose={() => {
                            setOpenModal(false);
                        }}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{backgroundColor:"rgba(0, 0, 0, 0.6)"}}
                    >
                        <Box sx={{mx:2}}>
                            <IconButton 
                                onClick={() => {
                                    setOpenModal(false);
                                }}
                                disableRipple 
                                sx={{float: 'right',color:"#FFF", mt:1}}>
                                 <ClearIcon  fontSize="large"/>
                            </IconButton>
                            <Map lat={property.lat} lng={property.lng}/>
                        </Box>
                    </Modal>
                </Box>
            )
        }
        </>
        );
}

export default PropertyDetailView;