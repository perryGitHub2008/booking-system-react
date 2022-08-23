import { Box, Typography, Button, Paper, TextField, Divider } from "@mui/material";
import React, {useState} from "react";
import Alert from '@mui/material/Alert';
import {green, grey} from '@mui/material/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Collapse from '@mui/material/Collapse';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import { useFormik } from "formik";
import * as yup from "yup"; 
import Countdown from "react-countdown";
import Autocomplete from '@mui/material/Autocomplete';
import CountryList from "../CountryList";
import { useProfile } from "../Context/ProfileProvider";
function BookingInputView(props) {
    
    const [someoneChecked, setSomeoneChecked] = useState(false);
    const [highFloorChecked, setHighFloorChecked] = useState(false);
    const [babyCotChecked, setBabyCotChecked] = useState(false);
    const [quietChecked, setQuietChecked] = useState(false);
    const [airportTranChecked, setAirportTranChecked] = useState(false);
    const [moreChecked, setMoreChecked] = useState(false);
    const bookingViewData = props.bookingViewData;
    const {profile} = useProfile();
    const handleSomeoneChecked = (event) => {
        setSomeoneChecked(event.target.checked);
    };
    const handleHighFloorChecked = (event) => {
        setHighFloorChecked(event.target.checked);
    };
    const handleBabyCotChecked = (event) => {
        setBabyCotChecked(event.target.checked);
    };
    const handleQuietChecked = (event) => {
        setQuietChecked(event.target.checked);
    };
    const handleAirportTranChecked = (event) => {
        setAirportTranChecked(event.target.checked);
    };
    const handleMoreChecked = () =>{
        setMoreChecked((prevOpen) => !prevOpen);
    }

    const validationObject = () =>{
        if(someoneChecked===false){
            return ({
                yup:{
                    fullName: yup
                        .string('Enter your fullName')
                        .required('Please enter a valid full name (English only).'),
                    email: yup
                        .string('Enter your email')
                        .email('Enter a valid email')
                        .required('Email is required'),
                    confirmEmail: yup
                        .string('Enter your email')
                        .email('Enter a valid email')
                        .oneOf([yup.ref('email'), null], 'Email must match')
                        .required('Email is required'),
                    residence: yup
                        .string('Select your residence')
                        .required('Please Select your residence.')
                }
            })
        } else {
            return ({
                yup:{
                    fullName: yup
                        .string('Enter your fullName')
                        .required('Please enter a valid full name (English only).'),
                    email: yup
                        .string('Enter your email')
                        .email('Enter a valid email')
                        .required('Email is required'),
                    confirmEmail: yup
                        .string('Enter your email')
                        .email('Enter a valid email')
                        .oneOf([yup.ref('email'), null], 'Email must match')
                        .required('Email is required'),
                    residence: yup
                        .string('Select your residence')
                        .required('Please select your residence.'),
                    someoneName: yup
                        .string('Enter fullName')
                        .required('Please enter a valid full name (English only).'),
                    someoneResidence: yup
                        .string('Select residence')
                        .required('Please select residence.')
                }
            })
        }
    };
    
    const validationSchema = yup.object(validationObject().yup);

    const formik = useFormik({
            initialValues: {
                fullName:profile.username || '',
                email: profile.username || '',
                confirmEmail:'',
                residence:'',
                someoneName:'',
                someoneResidence:''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            props.setActiveStep(1);
        },
    });

    const renderer = ({ minutes, seconds, completed}) => {
        if (completed) {
            // Render a complete state
            return null;
        } else {
            minutes = minutes < 10  ? ("0").concat(minutes):minutes
            seconds = seconds < 10  ? ("0").concat(seconds):seconds
            return `${minutes}:${seconds}`
        }
    }

    const addMoreTime = () =>{
        if(!props.moreTime){
            props.setTimer(props.timer+ 5000*60*3)
            props.setMoreTime(true)
        }
    }

    return (
        <Box sx={{mt:1, width:'66.7%'}}>
            <Alert severity="success" sx={{boxShadow:"0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)"}}>
                <Typography color={green[500]} sx={{display:'inline'}}>
                    Great choice of property
                </Typography> - with an {props.ratingEng(bookingViewData.totalrating/bookingViewData.totalreviews)} guest rating 
                of <Typography color={green[500]} sx={{display:'inline'}}>
                    {(bookingViewData.totalrating/bookingViewData.totalreviews).toPrecision(2)}
                </Typography> from {bookingViewData.totalreviews} reviews
            </Alert>
            <Alert 
                icon={<AccessTimeIcon/>} 
                severity="info" 
                sx={{mt:1, display:'flex', justifyContent:'flex-end', boxShadow:"0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)"}}
                >
                <Typography sx={{ width:'100%'}} component="div">                    
                    Holding Booking...   <Countdown date={props.timer} onComplete={props.timerCompleted} onTick={()=>props.setTimer(props.timer-1)} renderer={renderer} />
                    {!props.moreTime && <Button onClick={addMoreTime} color="primary" variant="contained" size="small">
                        I need more time
                    </Button>}
                </Typography>
            </Alert>
            <Paper sx={{mt:1,p:2}} elevation={3}>
                <Typography variant="h6">Let us know who you are</Typography>
                <TextField
                    sx={{mt:2, width:"100%"}}
                    required
                    id="fullName"
                    label="Full name"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                    helperText={formik.touched.fullName && formik.errors.fullName}
                />
                <TextField
                    sx={{mt:3, width:"100%"}}
                    required
                    id="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    sx={{mt:3, width:"100%"}}
                    required
                    id="confirmEmail"
                    label="Retype email"
                    value={formik.values.confirmEmail}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmEmail && Boolean(formik.errors.confirmEmail)}
                    helperText={formik.touched.confirmEmail && formik.errors.confirmEmail}
                />
                <Box>
                <TextField
                    sx={{mt:3, width:"48%"}}
                    label="Phone number (optional)"
                />
                <Autocomplete
                    sx={{mt:3,ml:3, width:"48%", display:'inline-block'}}
                    id="residence"
                    label="Country/region of residence"
                    options={CountryList.getList()}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                        formik.setFieldValue('residence', newValue.name)
                    }}
                    renderOption={(props, option) => (
                    <li {...props}>
                        <Box>
                            <Typography>
                            {option.name}
                            </Typography>
                        </Box>
                    </li>
                    )}
                    renderInput={(params) => <TextField {...params}
                    label={props.label !== undefined ? props.label:"Country/region of residence"}
                    error={formik.touched.residence && Boolean(formik.errors.residence)}
                    helperText={formik.touched.residence && formik.errors.residence} />}
                />
                </Box>
                {/*
                <FormGroup sx={{mt:2}}>
                    <FormControlLabel control={<Checkbox checked={someoneChecked} onChange={handleSomeoneChecked}/>} label="Please tick if you're making this booking for someone else." />
                </FormGroup>
                <Collapse in={someoneChecked} style={{transitionDuration:'500ms'}}>
                    <Box sx={{backgroundColor:grey[200],p:2}}>
                        <Typography variant="subtitle1">Guest information</Typography>
                        <TextField
                            sx={{mt:2, width:"100%"}}
                            required
                            id="someoneName"
                            label="Full name"
                            value={formik.values.someoneName}
                            onChange={formik.handleChange}
                            error={formik.touched.someoneName && Boolean(formik.errors.someoneName)}
                            helperText={formik.touched.someoneName && formik.errors.someoneName}
                        />
                        <Autocomplete
                            sx={{mt:3, width:"48%", display:'inline-block'}}
                            id="someoneResidence"
                            label="Country/region of residence"
                            options={CountryList.getList()}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, newValue) => {
                                formik.setFieldValue('someoneResidence', newValue.name)
                            }}
                            renderOption={(props, option) => (
                            <li {...props}>
                                <Box>
                                    <Typography>
                                    {option.name}
                                    </Typography>
                                </Box>
                            </li>
                            )}
                            renderInput={(params) => <TextField {...params}
                            label={props.label !== undefined ? props.label:"Country/region of residence"}
                            error={formik.touched.someoneResidence && Boolean(formik.errors.someoneResidence)}
                            helperText={formik.touched.someoneResidence && formik.errors.someoneResidence} />}
                        />
                    </Box>
                </Collapse>
                <Typography variant="subtitle1" sx={{mt:2}}>
                    <b>Let us know what you need</b>
                </Typography>
                <Typography variant="body2" sx={{mt:1}}>Requests are fulfilled on a first come, first served basis. We'll send yours right after you book.</Typography>
                <Box sx={{backgroundColor:grey[200],p:2, mt:2}}>
                    <FormControl sx={{width:'100%'}}>
                        <FormLabel><Typography variant="body2">Do you have a smoking preference?</Typography></FormLabel>
                        <RadioGroup sx={{display:'inline', mt:1}}>
                            <FormControlLabel sx={{width:'50%'}} value={false} control={<Radio />} label="Non-smoking" />
                            <FormControlLabel value={true} control={<Radio />} label="Smoking" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl sx={{width:'100%', mt:1}}>
                        <FormLabel><Typography variant="body2">What bed configuration do you prefer?</Typography></FormLabel>
                        <RadioGroup sx={{display:'inline', mt:1}}>
                            <FormControlLabel sx={{width:'50%'}} value={1} control={<Radio />} label="I'd like a large bed" />
                            <FormControlLabel value={2} control={<Radio />} label="I'd like twin beds" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <IconButton sx={{fontSize:'14px'}} onClick={(e)=>{handleMoreChecked()}}>
                    {!moreChecked ? <AddCircleOutlineIcon sx={{fontSize:'14px', mr:1}} /> : <RemoveCircleOutlineIcon sx={{fontSize:'14px', mr:1}}/>} 
                    <u>Click here for more requests</u>
                </IconButton>
                <Collapse in={moreChecked} style={{transitionDuration:'500ms'}}>
                    <Box sx={{border:'1px solid grey', p:2}}>
                        <FormControl sx={{width:'100%'}}>
                            <FormLabel>                            
                                <Typography variant="body2">We'll make sure your property or host gets your request quickly.</Typography>
                            </FormLabel>
                            <RadioGroup sx={{display:'inline', mt:1}}>
                                <FormControlLabel sx={{width:'50%'}} control={<Checkbox checked={highFloorChecked} onChange={handleHighFloorChecked} />} label="I'd like a room on a high floor" />
                                <FormControlLabel control={<Checkbox checked={babyCotChecked} onChange={handleBabyCotChecked} />} label={<Typography>I'd like to have a baby cot<br/>(additional charge may apply)</Typography>} />
                                <FormControlLabel sx={{width:'50%'}} control={<Checkbox checked={quietChecked} onChange={handleQuietChecked} />} label="I'd like a quiet room" />
                                <Divider/>
                                <FormControlLabel sx={{width:'50%'}} control={<Checkbox checked={airportTranChecked} onChange={handleAirportTranChecked} />} label="I'd like an airport transfer" />
                            </RadioGroup>
                        </FormControl>
                        {airportTranChecked &&
                            <>
                            <Typography variant="body2">
                                Note: An early check-in or airport transfer may require an additional payment. 
                                Please contact the property to confirm. Any personal requests? 
                                Let us know in <b>English</b> or <b>Chinese (Hong Kong)</b>.
                            </Typography>
                            <textarea 
                                rows="3" 
                                maxLength="50" 
                                placeholder="Enter your flight number & arrival time. Transfers are not guaranteed. Please confirm your request with the property." 
                                style={{marginTop:'12px', width:'100%', height:'50px', fontSize:'16px'}}>
                            </textarea>
                            </>
                        }
                        <Divider sx={{my:1}}/>
                        <Typography variant="body2">Any personal requests? Let us know in <b>English</b> or <b>Chinese (Hong Kong)</b>.</Typography>
                        <textarea 
                            rows="3" 
                            maxLength="500" 
                            style={{marginTop:'12px', width:'100%', height:'50px', fontSize:'16px'}}>
                        </textarea>
                    </Box>
                </Collapse>
                    */}
            </Paper>
            <Paper sx={{mt:1,p:2}} elevation={3}>
                <Button onClick={formik.handleSubmit} variant="contained">
                    NEXT: FINAL STEP
                </Button>
                <div>{"(Please use the below sandbox account for payment: sb-odldg19265348@personal.example.com : !@Ox<1Ah)"}</div>
            </Paper>
        </Box>
 
    );
}

export default BookingInputView;
