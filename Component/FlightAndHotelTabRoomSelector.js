import {useState, useRef, useEffect} from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';


function FlightAndHotelTabRoomSelector() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [room, setRoom] = useState('1')
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handleClick = (event, room) => {
        handleClose(event)
        setRoom(room)
    };

  // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
        useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            sx={{width:'100%', height:'100%', border:1, borderColor:'grey.700',borderRadius:'4px',color: 'grey.900', background: 'none',}}
            >
            {room} {room>1 ? 'Rooms': 'Room'}
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal 
            >
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{
                    transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
                >
                <Paper >
                    <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        
                    >
                        <MenuItem onClick={(e) =>handleClick(e,1)}>1 Room</MenuItem>
                        <MenuItem onClick={(e) =>handleClick(e,2)}>2 Rooms</MenuItem>
                        <MenuItem onClick={(e) =>handleClick(e,3)}>3 Rooms</MenuItem>
                        <MenuItem onClick={(e) =>handleClick(e,4)}>4 Rooms</MenuItem>
                        <MenuItem onClick={(e) =>handleClick(e,5)}>5 Rooms</MenuItem>
                        <MenuItem onClick={(e) =>handleClick(e,6)}>6 Rooms</MenuItem>
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Popper>
        </>

    );
}
export default FlightAndHotelTabRoomSelector;