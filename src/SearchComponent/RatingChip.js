import {useState,useRef, useEffect} from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Chip from '@mui/material/Chip';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';


function RatingChip() {
const [open, setOpen] = useState(false);
const anchorRef = useRef(null);
const [quarantine, setQuarantine] = useState('all');
const handleQuarantineChange = (event) => {
    setQuarantine(event.target.value);
};

const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
};

const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
    return;
    }

    setOpen(false);
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
    <div>
        <Chip 
            label="Star Ratings" 
            color="primary"
            ref={anchorRef}
            onDelete={handleToggle}
            onClick={handleToggle}
            deleteIcon={<ArrowDropDownIcon />}
        />
        <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        style={{zIndex:'9'}}
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
                <Paper>
                    <FormControl sx={{ p: 2 }}>
                        <FormLabel id="demo-radio-buttons-group-label">Star rating</FormLabel>
                        <Rating name="size-small" defaultValue={0} size="small" />
                    </FormControl>
                    <Divider sx={{pt:1}}/>
                    <FormControl sx={{ p: 2 }}>
                        <FormLabel id="demo-radio-buttons-group-label">Guest rating</FormLabel>
                        <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={quarantine}
                        name="radio-buttons-group"
                        onChange={handleQuarantineChange}
                        >
                            <FormControlLabel value="all" control={<Radio size="small"/>} label="9+ Exceptional" />
                            <FormControlLabel value="quarantine" control={<Radio size="small"/>} label="8+ Excellent" />
                            <FormControlLabel value="non" control={<Radio size="small"/>} label="7+ Very good" />
                            <FormControlLabel value="nos" control={<Radio size="small"/>} label="6+ Good" />
                        </RadioGroup>
                    </FormControl>
                    <Divider sx={{pt:1}}/>
                    <FormControl sx={{ p: 2 }}>
                        <FormLabel id="demo-radio-buttons-group-label">Location rating</FormLabel>
                        <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={quarantine}
                        name="radio-buttons-group"
                        onChange={handleQuarantineChange}
                        >
                            <FormControlLabel value="all" control={<Radio size="small"/>} label="9+ Exceptional" />
                            <FormControlLabel value="quarantine" control={<Radio size="small"/>} label="8+ Excellent" />
                            <FormControlLabel value="non" control={<Radio size="small"/>} label="7+ Very good" />

                        </RadioGroup>
                    </FormControl>
                </Paper>
                </ClickAwayListener>
            </Paper>
            </Grow>
        )}
        </Popper>
    </div>

);
}
export default  RatingChip