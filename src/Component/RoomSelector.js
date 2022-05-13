import { Fragment, useState,useRef, useEffect, useReducer } from "react";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';

const ACTIONS = {
    ADD_ROOM: 'add-room',
    REMOVE_ROOM: 'remove',
    ADD_ADULT: 'add-adult',
    ADD_CHILDREN: 'add-children',
    REMOVE_ADULT: 'remove-adult',
    REMOVE_CHILDREN: 'remove-children',
    SELECT_ADULT: 'select-adult',
    SELECT_CHILDREN: 'select-children'
}

function reducer(rooms, action){
    switch (action.type){
        case ACTIONS.ADD_ROOM:
            return [...rooms, {ID:Date.now(), Adults:2,Children:0,AgeArray:[]}]
        case ACTIONS.REMOVE_ROOM:
            return rooms.filter((room)=> room.ID !== action.payload.ID)
        case ACTIONS.ADD_ADULT:
            return rooms.map((room)=>{
                if(room.ID === action.payload.ID && room.Adults<20){
                        return {...room, Adults: room.Adults+1}
                } 
                return room
            })
        case ACTIONS.ADD_CHILDREN:
            return rooms.map((room)=>{
                if(room.ID === action.payload.ID && room.Children<6){
                    room.AgeArray.push({ID:Date.now(), Age:0})
                    return {...room, Children: room.Children+1}
                }
                return room
            })
        case ACTIONS.REMOVE_ADULT:
            return rooms.map((room)=>{
                if(room.ID === action.payload.ID && room.Adults>0){
                    return {...room, Adults: room.Adults-1}
                } 
                return room
            })
        case ACTIONS.REMOVE_CHILDREN:
            return rooms.map((room)=>{
                if(room.ID === action.payload.ID && room.Children>0){
                    room.AgeArray.pop()
                    return {...room, Children: room.Children-1}
                }
                return room
            })
        case ACTIONS.SELECT_ADULT:
            return rooms.map((room)=>{
                if(room.ID === action.payload.ID && action.payload.travelerType==='Adult'){
                    return {...room, Adults: action.payload.numTraveler}
                } 
                return room
            })
        case ACTIONS.SELECT_CHILDREN:
            return rooms.map((room)=>{
                if(room.ID === action.payload.ID){
                    const differenceInChildren = room.Children - action.payload.numChildren
                    if(differenceInChildren > 0){
                        for(var i = 0 ; i < differenceInChildren ; i++){
                            room.AgeArray.pop()
                        }
                    } else if (differenceInChildren < 0){
                        for(var j = 0 ; j >differenceInChildren ; j --){
                            room.AgeArray.push({ID:Date.now(), Age:0})
                        }
                    }
                    return {...room, Children: action.payload.numChildren}
                }
                return room
            })
        default:
    }   
}

function RoomSelector () {


    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
      console.log(anchorRef.current.offsetWidth)
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      
      setOpen(false);
    };
  
  
  
    const prevOpen = useRef(open);
    useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
  

    const scrollToBottomEl = useRef(null);
    const [rooms, dispatch] = useReducer(reducer, 
            [{  ID:Date.now(), 
                Adults:2,
                Children:0,
                AgeArray:[]
            }]
        )

    useEffect(()=>{
        scrollToBottom();
    },[rooms.length])

    const totalTraveler =()=>{
        const adults = rooms.reduce((prev, curr) =>
        { return prev + curr.Adults+ curr.Children}, 0);
        return adults;
    };

    const scrollToBottom = () =>{ 
        scrollToBottomEl.current?.scrollTo({top:1000, behavior: 'smooth'})
    }; 
    const handleChange = (event, id) => {
        dispatch({type: ACTIONS.SELECT_CHILDREN, payload: {ID: id, numChildren: event.target.value}})
    };
    const setAdultSelect = ()=>{
        var adults = [];
        for (var i = 0; i <= 20; i++) {
            adults.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
        }
        return adults;
    };
    const setChildrenSelect = ()=>{
        var children = [];
        for (var i = 0; i <= 6; i++) {
            children.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
        }
        return children;
    };
    const setAgeSelect = ()=>{
        const age = [];
        for (var i = 0; i <= 17 ; i++){
            age.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
        }
        return age;
    }


    const roomList = rooms.map((data,index)=>{
        const ageList = data.AgeArray.map((ageData,sIndex)=>{
            return (
                <ListItem>
                    <ListItemText id="list-label-adults" primary={`Age of child ${sIndex+1}`} />
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={ageData.Age}
                        onChange={(e) =>handleChange(e, data.ID, 'Age')}
                        autoWidth
                        label="Age"
                        variant='standard'
                        MenuProps={{ disablePortal: true }}
                        >
                        {setAgeSelect()}
                    </Select>
                </ListItem>
            )
        })
        

        return(
            <Fragment key={index}>      
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography sx={{p:1, ml:1}}>
                            Room {index+1}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                    {rooms.length > 1 &&
                        <Button variant="contained" onClick={()=>dispatch({type: ACTIONS.REMOVE_ROOM, payload: {ID: data.ID}})} sx={{mt:0.5}}>
                            Remove
                        </Button>
                    }
                    </Grid>
                </Grid>  
                <ListItem>
                    <ListItemText id="list-label-adults" primary="Adults:" />
                    <IconButton onClick={()=>dispatch({type: ACTIONS.REMOVE_ADULT, payload: {ID: data.ID}})}>
                        <RemoveCircleOutlineIcon/>
                    </IconButton>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={data.Adults}
                        onChange={(e) =>handleChange(e, data.ID, 'Adult')}
                        autoWidth
                        label="Age"
                        variant='standard'
                        MenuProps={{ disablePortal: true }}
                        >
                        {setAdultSelect()}
                    </Select>
                    <IconButton onClick={()=>dispatch({type: ACTIONS.ADD_ADULT, payload: {ID: data.ID}})}>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                </ListItem>
                <ListItem>
                    <ListItemText id="list-label-children" primary="Children:" secondary="Ages 0 to 17"/>
                    <IconButton onClick={()=>dispatch({type: ACTIONS.REMOVE_CHILDREN, payload: {ID: data.ID}})}>
                        <RemoveCircleOutlineIcon/>
                    </IconButton>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={data.Children}
                        onChange={(e) =>handleChange(e, data.ID, 'Children')}
                        autoWidth
                        label="Age"
                        variant='standard'
                        MenuProps={{ disablePortal: true }}
                        >
                        {setChildrenSelect()}
                    </Select>
                    <IconButton onClick={()=>dispatch({type: ACTIONS.ADD_CHILDREN, payload: {ID: data.ID}})}>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                </ListItem>
                {
                    data.AgeArray.length > 0 &&
                    ageList
                }
                <Divider />            
            </Fragment>
          ); 
    });
    const AddRoomButton = () => {
        if(rooms.length>7){
            return (<Button disabled onClick={()=>dispatch({type: ACTIONS.ADD_ROOM})} sx={{width:1, py:'10px'}}>
                Add a Room
            </Button>);
        } else {
            return (<Button onClick={()=>{dispatch({type: ACTIONS.ADD_ROOM});}} sx={{width:1, py:'10px'}}>
                Add a Room
            </Button>);
        }
    }
    return (
        <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{ border:1, borderColor:'grey.700',borderRadius:'4px',color: 'grey.900', background: 'none', width:1, height:'56px'}}
        >
          {rooms.length} Room, {totalTraveler()} Guest
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
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
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                <List ref={scrollToBottomEl} sx={{ overflow: 'auto', maxHeight:'425px', width:'385px'}}>
                    {roomList}
                    <Divider />
                    <AddRoomButton />
                    <Divider />
                    <div ></div>
                </List>
                </ClickAwayListener>
                <List>
                    <ListItem>
                        <ListItemText sx={{}} id="list-label-children" primary={`${rooms.length} Room`} secondary={`${totalTraveler()} Guests`} />
                    </ListItem>
                </List>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
}

export default RoomSelector;
