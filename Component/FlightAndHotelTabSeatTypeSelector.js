import {useState, useRef, useEffect} from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';


function FlightAndHotelTabSeatTypeSelector() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [tripState, setTripState] = useState('Economy')
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handleEconomyClick = (event) => {
        handleClose(event)
        setTripState('Economy')
    };
    const handlePremiumClick = (event) => {
        handleClose(event)
        setTripState('Premium Economy')
    };
    const handleBusinessClick = (event) => {
        handleClose(event)
        setTripState('Business')
    };
    const handleFirstClassClick = (event) => {
        handleClose(event)
        setTripState('First Class')
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
            variant="contained"
            sx={{ml:2, zIndex:9}}
            >
            {tripState}
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
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                    >
                        <MenuItem onClick={handleEconomyClick}>Economy</MenuItem>
                        <MenuItem onClick={handlePremiumClick}>Premium Economy</MenuItem>
                        <MenuItem onClick={handleBusinessClick}>Business</MenuItem>
                        <MenuItem onClick={handleFirstClassClick}>First Class</MenuItem>
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Popper>
        </>

    );
}
export default FlightAndHotelTabSeatTypeSelector;