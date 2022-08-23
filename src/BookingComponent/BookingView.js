import React, {useState, useEffect, useMemo} from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import{Link} from 'react-router-dom'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import PropTypes from 'prop-types';
import { Box, Button, Paper, Divider} from "@mui/material";
import BookingInputView from "./BookingInputView";
import bookingService from "../Service/bookingService";
import {useLocation, useNavigate} from "react-router-dom";
import HotelImage1 from '../PropertyDetailComponent/image/f526fd54305fe996b8759421e43ad0e5.jpg'
import Rating from '@mui/material/Rating';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {blue ,grey} from '@mui/material/colors';
import NumberFormat from 'react-number-format';
import Paypal from "./Paypal";
import Loading from "../Loading";
import { useProfile } from "../Context/ProfileProvider";
function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

function BookingView() {
    const query = useQuery();
    const history = useNavigate();
    const room =query.get("room")
    const adult=query.get("adult")
    const checkin=new Date(query.get("checkin"))
    const checkout=new Date(query.get("checkout"))
    const diffDate = (checkout.getTime()-checkin.getTime())/ (1000*3600*24);
    const {profile} = useProfile();
    const [loading, setLoading] = useState(true);
    const [bookingViewData, setBookingViewData] = useState();
    const [timer, setTimer] = useState(Date.now() + 5000*60*3);
    const [moreTime, setMoreTime] = useState(false);

    var options = { day: 'numeric', month: 'short' , year: 'numeric'};

    useEffect(()=>{
        const fetchData = async () =>{

            try {
                await new Promise(f => setTimeout(f, 2000));
                const {data: bookingView} = await bookingService.getBookingView(query.get("offerID"));
                setBookingViewData(bookingView);
            } catch (error) {
              console.error(error.message);
            }
            setLoading(false);
          }
      
          fetchData();
    },[loading])

    const steps = [
        'Customer information',
        'Payment information',
        'Booking is confirmed!',
    ];
    const [activeStep, setActiveStep] = useState(0);

    const QontoConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 10,
            left: 'calc(-50% + 16px)',
            right: 'calc(50% + 16px)',
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#fff',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#fff',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.grey[500],
            borderTopWidth: 3,
            borderRadius: 1,
        },
    }));
      
    const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
            color: theme.palette.grey[500],
            display: 'flex',
            height: 22,
            alignItems: 'center',
            ...(ownerState.active && {
            color: '#fff',
        }),
        '& .QontoStepIcon-completedIcon': {
            color: '#000',
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: '#fff',
            zIndex: 1,
        },
        '& .QontoStepIcon-circle': {
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: theme.palette.grey[500],
            color:'#000',
            textAlign: "center",
        },
        '& .QontoStepIcon-active': {
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: '#fff',
            color:'#000',
            textAlign: "center",
        },
    }));
      
    function QontoStepIcon(props) {
        const { active, completed, className } = props;
      
        return (
            <QontoStepIconRoot ownerState={{ active }} className={className}>
                {active ? (
                    <div className="QontoStepIcon-active">
                        <Typography sx={{padding:"2px 0"}} variant="caption" component="div">
                            {props.icon}
                        </Typography>
                    </div>
                ) : (
                    completed ? (<Check className="QontoStepIcon-completedIcon" />) : 
                    (
                        <div className="QontoStepIcon-circle">
                            <Typography sx={{padding:"2px 0"}} variant="caption" component="div">
                                {props.icon}
                            </Typography>
                        </div>
                    )
                )}
            </QontoStepIconRoot>
        );
    }
      
    QontoStepIcon.propTypes = {
        /**
         * Whether this step is active.
         * @default false
         */
        active: PropTypes.bool,
        className: PropTypes.string,
        /**
         * Mark the step as completed. Is passed to child components.
         * @default false
         */
        completed: PropTypes.bool,
    };

    const StepperContent = () =>{
        if(activeStep===0){
            return <BookingInputView 
                    bookingViewData={bookingViewData} 
                    room={room} 
                    adult={adult} 
                    checkin={checkin} 
                    checkout={checkout}
                    setActiveStep={setActiveStep}
                    ratingEng={ratingEng}
                    timer={timer}
                    setTimer={setTimer}
                    moreTime={moreTime}
                    setMoreTime={setMoreTime}
                    timerCompleted={timerCompleted} />
        } else if (activeStep ===1){
            return <Paypal 
                    room={room} 
                    timer={timer}
                    offerId={query.get("offerID")}
                    price={bookingViewData.price}
                    propertyid={bookingViewData.propertyid}
                    checkin={checkin} 
                    checkout={checkout}
                    adult={adult} 
                    setTimer={setTimer}
                    moreTime={moreTime}
                    setMoreTime={setMoreTime}
                    timerCompleted={timerCompleted}
                    night={diffDate}/>
        }
    }

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

    const timerCompleted = () =>{
        history(`/property-details?propertyid=${bookingViewData.propertyid}&room=${room}&adult=${adult}&checkin=${checkin}&checkout=${checkout}`);
        window.location.reload();
    }

    return (
        !loading ? (
            <>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ display: 'flex', mt:1, width:'1080px', ml:"auto", mr:"auto"}}>
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to={'/'}
                            sx={{ mr: 2, color:'white',textDecoration: "none", display: { xs: 'none', md: 'flex' } }}
                        >
                            Clone
                            <br/>
                            Agoda
                        </Typography>
                        <Box sx={{width:'67%', ml:'auto', mr:'auto'}}>
                            <Stepper sx={{mt:0, width:'100%'}} alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                                {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel StepIconComponent={QontoStepIcon}><Typography sx={{color:'#fff'}} variant="overline" component="div">{label}</Typography></StepLabel>
                                </Step>
                                ))}
                            </Stepper>
                        </Box>
                        {/*profile.username===undefined &&
                            <Button 
                                key={1}
                                sx={{ my: 1, color: 'white', display: 'block', border:'1px solid white' }}
                                >
                                SIGN IN
                            </Button>
                        */}
                    </Box>         
                </Toolbar>   
            </AppBar>
            <Box sx={{ display: 'flex', mt:1, width:'1080px', ml:"auto", mr:"auto"}}>
                {StepperContent()}
                <Box sx={{width:'33%', mt:1, ml:2}}>
                    <Paper sx={{display:'flex', p:2}} elevation={3}>
                        <img width="87px" src={HotelImage1} alt={HotelImage1}/>
                        <Box sx={{ml:1, width:'100%'}}>
                            <Typography variant="h6">{bookingViewData.propertyname}</Typography>
                            <Rating sx={{fontSize: 18 }} name="read-only" value={bookingViewData.star} readOnly /><br/>
                            <Typography variant="caption">{bookingViewData.address}, {bookingViewData.area}, {bookingViewData.city}, {bookingViewData.state}, {bookingViewData.country}</Typography>
                        </Box>
                    </Paper>
                    <Paper sx={{ display:'flex', flexWrap: 'wrap', p:2,pt:2,mt:1}} elevation={3}>
                        <Box sx={{width:'70%'}}>
                            <Typography variant="subtitle1" ><b>{new Date(query.get("checkin")).toLocaleDateString('en-GB',options)} - {new Date(query.get("checkout")).toLocaleDateString('en-GB',options)}</b></Typography>
                            <Typography variant="subtitle2" sx={{my:1}}><b>{query.get("room")} x {bookingViewData.roomname}</b></Typography>
                            <Box sx={{display: 'flex',mt:2}}>
                                <Box 
                                    sx={{ml:1, 
                                        width: 48, 
                                        height: 48, 
                                        backgroundColor: blue[600], 
                                        borderRadius: '50% 50% 0 50%', 
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                }}>
                                    <Typography style={{textAlign: 'center'}} variant="h6" color="white">
                                        {(bookingViewData.hightestrating/bookingViewData.totalreviews).toPrecision(2)}
                                    </Typography>
                                </Box>
                                <Typography sx={{ml:2, width:'70%'}} variant="subtitle1">
                                    <b>{ratingEng((bookingViewData.hightestrating/bookingViewData.totalreviews).toPrecision(2))} {bookingViewData.highesttitle}</b>    
                                    <br></br>
                                    <Typography color="text.secondary">
                                        {bookingViewData.totalreviews} reviews
                                    </Typography>
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{width:'25%'}}>
                            <Typography variant="overline" sx={{float:"right"}} >1 night</Typography>
                            {/*<Link to='' style={{float:"right", fontSize:"12px", margin:'8px 0'}}>Change</Link>*/}
                        </Box>
                        <Divider sx={{my:1, width:'100%'}}/>
                        <Box sx={{display:'flex',width:'100%'}}>
                            <img width="87px" src={HotelImage1} alt={HotelImage1}/>
                            <Box sx={{ml:1, width:'100%'}}>
                                <Box sx={{display:'flex',width:208}}>
                                    <PersonOutlineOutlinedIcon sx={{fontSize:'14px', mt:'3px'}}/>
                                    <Typography variant="caption"  component="p" sx={{ml:1}}>
                                        {query.get("room")} room {bookingViewData.guest} guests
                                    </Typography>
                                </Box>
                                <Box sx={{display:'flex',width:208}}>
                                    <GroupsOutlinedIcon sx={{fontSize:'14px', mt:'3px'}}/>
                                    <Typography variant="caption"  component="p" sx={{ml:1}}>
                                        Max {bookingViewData.guest} guests
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                    <Paper sx={{mt:1}} elevation={3}>
                        <Box sx={{backgroundColor:grey[200], p:2, borderBottom:`1px solid ${grey[400]}`}}>
                            <Box>
                                <Typography variant="body2" sx={{display:'inline'}} component="div">
                                    Room price ({room} rooms x {diffDate} nights)
                                </Typography>
                                <Typography variant="body2" sx={{float:'right'}} component="div">
                                    <NumberFormat value={(bookingViewData.price * query.get("room")*diffDate)} displayType={'text'} thousandSeparator={true} prefix={'HKD '} />
                                </Typography>
                            </Box>
                            <Box sx={{mt:1}}>
                                <Typography variant="body2" sx={{display:'inline'}} component="div">
                                    Booking fees
                                </Typography>
                                <Typography variant="body2" sx={{float:'right'}} component="div">
                                    FREE
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{p:2}}>
                            <Box>
                                <Typography variant="body1" sx={{display:'inline'}} component="div">
                                    <b>Price</b>
                                </Typography>
                                <Typography variant="body1" sx={{float:'right'}} component="div">
                                    <b><NumberFormat value={((bookingViewData.price * query.get("room"))*diffDate*1.1)} displayType={'text'} thousandSeparator={true} prefix={'HKD '} /></b>
                                </Typography>
                            </Box>
                            <Box sx={{mt:1}}>
                                <Typography variant="caption" sx={{display:'inline'}} component="div">
                                    <b>Included in price: </b>Service charge 10%
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Box>
            </>
        ) : ( <Loading text={"You'll be ready to pack in just a minute."}/>)
    );
}

export default BookingView;
