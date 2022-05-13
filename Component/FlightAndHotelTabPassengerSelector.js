import {  useState, useReducer, useEffect} from "react";
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Popper from '@mui/material/Popper';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import FlightAndHotelTabPassengerSelectorMenuList from "./FlightAndHotelTabPassengerAdultSelector";
import FlightAndHotelTabPassengerChildrenSelector from "./FlightAndHotelTabPassengerChildrenSelector";
import FlightAndHotelTabPassengerInfantSelector from "./FlightAndHotelTabPassengerInfantSelector";

const ACTIONS = {
    ADD_ADULT: 'add-adult',
    ADD_CHILDREN: 'add-children',
    ADD_INFANT: 'add-infant',
    REMOVE_ADULT: 'remove-adult',
    REMOVE_CHILDREN: 'remove-children',
    REMOVE_INFANT: 'remove-infant',
    SELECT_ADULT: 'select-adult',
    SELECT_CHILDREN: 'select-children',
    SELECT_INFANT: 'select-infant'
}

function reducer(passengers, action){
    switch (action.type){
        case ACTIONS.ADD_ADULT:
            if(passengers['Adult']< 6)
                return {...passengers, Adult: passengers.Adult +1}
            return passengers
        case ACTIONS.REMOVE_ADULT:
            if(passengers['Adult']> 0)
                return {...passengers, Adult: passengers.Adult -1}
            return passengers
        case ACTIONS.SELECT_ADULT:
            return {...passengers, Adult: action.payload.numAdult}
        case ACTIONS.ADD_CHILDREN:
            if(passengers['Children']<6)
                return {...passengers, Children: passengers.Children +1}
            return passengers
        case ACTIONS.REMOVE_CHILDREN:
            if(passengers['Children']>0)
                return {...passengers, Children: passengers.Children -1}
            return passengers
        case ACTIONS.SELECT_CHILDREN:
            return {...passengers, Children: action.payload.numChildren}
        case ACTIONS.ADD_INFANT:
            if(passengers['Infant']<6)
                return {...passengers, Infant: passengers.Infant +1}
            return passengers
        case ACTIONS.REMOVE_INFANT:
            if(passengers['Infant']>0)
                return {...passengers, Infant: passengers.Infant -1}
            return passengers
        case ACTIONS.SELECT_INFANT:
            return {...passengers, Infant: action.payload.numInfant}
        default:
    }   
}

function FlightAndHotelTabPassengerSelector (){
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [warning, setWarning] = useState('');
    const [passengers, dispatch] = useReducer(reducer, {Adult:0,Children:0,Infant:0})
    const handleListOpen = (event) => {
        setOpen((prev) => !prev);
        setAnchorEl(event.currentTarget);
    };
    const handleAdultChange = (event, number) => {
        dispatch({type: ACTIONS.SELECT_ADULT, payload: {numAdult: number}})
    };
    const handleChildrenChange = (event, number) => {
        dispatch({type: ACTIONS.SELECT_CHILDREN, payload: {numChildren: number}})
    };
    const handleInfantChange = (event, number) => {
        dispatch({type: ACTIONS.SELECT_INFANT, payload: {numInfant: number}})
    };
    const handleListClose = () => {
        setOpen(false);
        setAnchorEl(null)
    };
    const totalTraveler =()=>{
        return passengers['Infant']+passengers['Children']+passengers['Adult'];
    };
    
    useEffect(()=>{
        if(passengers['Infant']+passengers['Children']+passengers['Adult'] > 6)
            setWarning('PassengerExceed')
        else if(passengers['Children']/2 > passengers['Adult'])
            setWarning('ChildrenExceed')
        else if(passengers['Infant'] > passengers['Adult'])
            setWarning('InfantExceed')
        else
            setWarning('')
    },[passengers])
    const WarningButton = ()=>{
        if(warning==='PassengerExceed'){
            return (
                <ListItem>
                    <Stack sx={{ width: '100%'}}  >
                        <Alert variant="filled" severity="error" sx={{boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)'}}>
                            Error ! Total number of passengers cannot exceed 6
                        </Alert>
                    </Stack>
                </ListItem>
            );
        } else if(warning==='ChildrenExceed') {
            return (
                <ListItem>
                    <Stack sx={{ width: '100%'}}  >
                        <Alert variant="filled" severity="error" sx={{boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)'}}>
                            Error ! Each adult may accompany a maximum of 2 children
                        </Alert>
                    </Stack>
                </ListItem>
            );
        } else if(warning==='InfantExceed') {
            return (
                <ListItem>
                    <Stack sx={{ width: '100%'}}  >
                        <Alert variant="filled" severity="error" sx={{boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)'}}>
                            Error ! Each adult may accompany a maximum of 1 infant
                        </Alert>
                    </Stack>
                </ListItem>
            );
        }
    }   
    return(
        <ClickAwayListener onClickAway={handleListClose}>
        <Box >
            <Box sx={{border:1, borderColor:'grey.600',borderRadius:'4px'}}>
                <Button onClick={handleListOpen} sx={{ color: 'grey.900', background: 'none', width:1, height:'56px'}}>
                     {totalTraveler()} Passenger
                </Button>
            </Box>
            {open ? (
            <Popper 
                open={open} 
                anchorEl={anchorEl}     
                modifiers={[
                    {
                        name: 'flip',
                        enabled: false,
                    },
                    {
                        name: 'preventOverflow',
                        enabled: false,
                    }
                ]}
            >
            <Box sx={{background:'white',borderRadius:'10px', boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)'}}>
                <List sx={{ overflow: 'auto', maxHeight:'425px', width:'470px'}}>
                    <ListItem>
                        <ListItemText id="list-label-children" primary="Adults:" secondary="12yrs and above"/>
                        <IconButton onClick={()=>dispatch({type: ACTIONS.REMOVE_ADULT})}>
                            <RemoveCircleOutlineIcon/>
                        </IconButton>
                            <FlightAndHotelTabPassengerSelectorMenuList adult={passengers['Adult']} handleAdultChange={handleAdultChange}/>
                        <IconButton onClick={()=>dispatch({type: ACTIONS.ADD_ADULT})}>
                            <AddCircleOutlineIcon/>
                        </IconButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText id="list-label-children" primary="Children:" secondary="2-11yrs"/>
                        <IconButton onClick={()=>dispatch({type: ACTIONS.REMOVE_CHILDREN})}>
                            <RemoveCircleOutlineIcon/>
                        </IconButton>
                            <FlightAndHotelTabPassengerChildrenSelector children={passengers['Children']} handleChildrenChange={handleChildrenChange}/>
                        <IconButton onClick={()=>dispatch({type: ACTIONS.ADD_CHILDREN})}>
                            <AddCircleOutlineIcon/>
                        </IconButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText id="list-label-children" primary="Infants:" secondary="below 2yrs"/>
                        <IconButton onClick={()=>dispatch({type: ACTIONS.REMOVE_INFANT})}>
                            <RemoveCircleOutlineIcon/>
                        </IconButton>
                            <FlightAndHotelTabPassengerInfantSelector infant={passengers['Infant']} handleInfantChange={handleInfantChange} />
                        <IconButton onClick={()=>dispatch({type: ACTIONS.ADD_INFANT})}>
                            <AddCircleOutlineIcon/>
                        </IconButton>
                    </ListItem>
                    <Divider />
                    {WarningButton()}
                </List>
            </Box>
            </Popper>
            ) : null}
        </Box>
        </ClickAwayListener>
    );
}

export default FlightAndHotelTabPassengerSelector;
