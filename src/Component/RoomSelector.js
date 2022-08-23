import { Fragment, useState,useRef, useEffect, useReducer } from "react";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Divider from '@mui/material/Divider';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import RoomAdultSelector from "./RoomAdultSelector";
import RoomAgeSelector from "./RoomAgeSelector";
import RoomsSelector from "./RoomsSelector";
import {useLocation} from "react-router-dom";
import {useMemo} from 'react'

const ACTIONS = {
    ADD_ROOM: 'add-room',
    REMOVE_ROOM: 'remove',
    ADD_ADULT: 'add-adult',
    ADD_CHILDREN: 'add-children',
    REMOVE_ADULT: 'remove-adult',
    REMOVE_CHILDREN: 'remove-children',
    SELECT_ROOM: 'select-room',
    SELECT_ADULT: 'select-adult',
    SELECT_CHILDREN: 'select-children',
    SELECT_AGE: 'select-age'
}

function reducer(rooms, action){
    switch (action.type){
        case ACTIONS.ADD_ROOM:
            if(rooms.Room<10){
                if(rooms.Adults<=rooms.Room)
                    return {...rooms, Room: rooms.Room+1, Adults:rooms.Room+1}
                return {...rooms, Room: rooms.Room+1};
            }
            return rooms
        case ACTIONS.REMOVE_ROOM:
            if(rooms.Room>1)
            return {...rooms, Room: rooms.Room-1};
            return rooms;
        case ACTIONS.ADD_ADULT:
            if(rooms.Adults<10)
            return {...rooms, Adults: rooms.Adults+1};
            return rooms
        case ACTIONS.ADD_CHILDREN:
            if(rooms.Children<10){
                rooms.AgeArray.push({ID:Date.now(), Age:0})
                return {...rooms, Children: rooms.Children+1};
            }
            return rooms
        case ACTIONS.REMOVE_ADULT:
            if(rooms.Adults>1)
            return {...rooms, Adults: rooms.Adults-1};
            return rooms
        case ACTIONS.REMOVE_CHILDREN:
            if(rooms.Children>0){
                rooms.AgeArray.pop()
                return {...rooms, Children: rooms.Children-1};
            }
            return rooms
        case ACTIONS.SELECT_ROOM:
            return {...rooms, Room: action.payload.numRoom};
        case ACTIONS.SELECT_ADULT:
            return {...rooms, Adults: action.payload.numAdult};

        case ACTIONS.SELECT_CHILDREN:
            const differenceInChildren = rooms.Children - action.payload.numChildren
            if(differenceInChildren > 0){
                for(var i = 0 ; i < differenceInChildren ; i++){
                    rooms.AgeArray.pop()
                }
            } else if (differenceInChildren < 0){
                for(var j = 0 ; j >differenceInChildren ; j --){
                    rooms.AgeArray.push({ID:j, Age:0})
                }
            }
            return {...rooms, Children: action.payload.numChildren};
            
        case ACTIONS.SELECT_AGE:
            return rooms.AgeArray.map((age)=>{
                if(age.ID === action.payload.ID){
                    return age.Age=action.payload.age
                }
                return age
                })
        default:
    }   
}

function RoomSelector (props) {
    function useQuery() {
        const { search } = useLocation();
        return useMemo(() => new URLSearchParams(search), [search]);
      } 
      const query = useQuery();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
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
  
    const setRooms = () => {
        if(query.get("adult") !== null){
            return {   Adults:query.get("adult"),
                Children:0,
                Room:query.get("room"),
                AgeArray:[]
            }
        } else {
            return  {   Adults:2,
                Children:0,
                Room:1,
                AgeArray:[]
            }
        }
    }

    const [rooms, dispatch] = useReducer(reducer, 
            setRooms()
        )

    useEffect(()=>{
        props.setRoomCallback(rooms)
    })

    const handleRoomChange = (event) => {
        dispatch({type: ACTIONS.SELECT_ROOM, payload: {numRoom: event.target.value}})
    };
    const handleChildrenChange = (event ) => {
        dispatch({type: ACTIONS.SELECT_CHILDREN, payload: {numChildren: event.target.value}})
    };
    const handleAdultChange = (event,) => {
        dispatch({type: ACTIONS.SELECT_ADULT, payload: {numAdult: event.target.value}})
    };
    const handleAgeChange = (event,ageID) => {
        dispatch({type: ACTIONS.SELECT_AGE, payload: {age: event.target.value, ageID: ageID}})
    };

    const roomList = ()=>{
        let ageList = {}
        if(rooms.AgeArray!==null)
        ageList = rooms.AgeArray.map((ageData,sIndex)=>{
            return (
                <ListItem>
                    <ListItemText id="list-label-age" primary={`Age of child ${sIndex+1}`} />
                    <RoomAgeSelector age={ageData['Age']} ageID={ageData.ID} handleAgeChange={handleAgeChange}/>
                </ListItem>
            )
        })
        

        return(
            <Fragment>      
                <ListItem>
                    <ListItemText id="list-label-room" primary="Room:"/>
                    <IconButton  onClick={()=>dispatch({type: ACTIONS.REMOVE_ROOM, payload: {}})}>
                        <RemoveCircleOutlineIcon/>
                    </IconButton>
                        <RoomsSelector room={rooms.Room}  handleRoomChange={handleRoomChange}/>
                    <IconButton onClick={()=>dispatch({type: ACTIONS.ADD_ROOM, payload: {}})}>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                </ListItem>
                <ListItem>
                    <ListItemText id="list-label-adults" primary="Guest:"/>
                    <IconButton disabled={rooms.Room>=rooms.Adults ? true :false} onClick={()=>dispatch({type: ACTIONS.REMOVE_ADULT, payload: {}})}>
                        <RemoveCircleOutlineIcon/>
                    </IconButton>
                        <RoomAdultSelector adult={rooms.Adults}  handleAdultChange={handleAdultChange}/>
                    <IconButton  onClick={()=>dispatch({type: ACTIONS.ADD_ADULT, payload: {}})}>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                </ListItem>
                {
                    rooms.AgeArray.length > 0 &&
                    ageList
                }
                <Divider />            
            </Fragment>
          ); 
    };

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
           {rooms.Room} Room, {rooms.Adults} Guest
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          style={{zIndex:1}}
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
                <List sx={{ overflow: 'auto', maxHeight:'425px', width:'385px'}}>
                    {roomList()}
                    <Divider />
                </List>
                </ClickAwayListener>

              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
}

export default RoomSelector;
