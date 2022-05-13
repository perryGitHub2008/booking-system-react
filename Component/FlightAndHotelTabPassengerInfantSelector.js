import {useState, useRef, useEffect} from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


function FlightAndHotelTabPassengerInfantSelector(props) {
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
    const handleClick = (event, room) => {
        handleClose(event)
        props.handleInfantChange(event, room)
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
            sx={{height:'100%', border:1, borderColor:'grey.700',borderRadius:'4px',color: 'grey.900', background: 'none',}}
            >
            {props.infant}
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
                    <Menu
                        anchorEl={anchorRef.current}
                        open={open}
                        onClose={handleClose}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        
                    >
                        <MenuItem onClick={(e) =>handleClick(e,1)}>1</MenuItem>
                        <MenuItem onClick={(e) =>handleClick(e,2)}>2</MenuItem>
                        <MenuItem onClick={(e) =>handleClick(e,3)}>3</MenuItem>
                        <MenuItem onClick={(e) =>handleClick(e,4)}>4</MenuItem>
                        <MenuItem onClick={(e) =>handleClick(e,5)}>5</MenuItem>
                        <MenuItem onClick={(e) =>handleClick(e,6)}>6</MenuItem>
                    </Menu>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Popper>
        </>

    );
}
export default FlightAndHotelTabPassengerInfantSelector;