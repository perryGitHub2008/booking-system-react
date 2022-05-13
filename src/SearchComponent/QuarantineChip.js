import {useState,useRef, useEffect} from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Chip from '@mui/material/Chip';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SvgIcon from '@mui/material/SvgIcon';

function QuarantineIcon(props) {
  return (
    <SvgIcon {...props}>
        <path d='M12 4c1.245 0 2.21.465 3.403 1.442l.242.203.953.814c.393.316 1.036.57 1.854.752.557.125 1.158.21 1.76.26l.332.026.143.008.32.013H22.5l.145.006c.713.069 1.28.64 1.348 1.356l.007.145v2.058l-.007.166c-.062.71-.517 1.354-1.161 1.804l-.165.109-3.386 2.309-.08.044a.465.465 0 0 1-.026.01c-1.367 2.031-3.317 3.53-5.94 4.296a4.504 4.504 0 0 1-2.514 0c-2.618-.764-4.57-2.265-5.936-4.312L4.77 15.5l-.076-.048L.991 12.57c-.64-.396-.946-1.02-.986-1.845L0 10.533V9.025c0-.784.595-1.428 1.356-1.5l.144-.007h1.489l.268-.01c.481-.022 1.075-.077 1.693-.18 1.092-.183 1.961-.475 2.452-.869l.182-.151 1.013-.866C9.79 4.465 10.756 4 12 4zm10.5 4.523l-1.02-.002c-.025.382-.075.842-.16 1.363a15.267 15.267 0 0 1-.969 3.438l-.125.29 1.898-1.294.14-.093c.408-.29.678-.665.728-1.023l.008-.119V9.025l-.008-.09a.502.502 0 0 0-.402-.404l-.09-.008zm-21 0h1.016l.035.431c.03.307.074.657.138 1.042a15.09 15.09 0 0 0 .954 3.372L1.56 11.746l-.104-.072C1.13 11.427 1 11.078 1 10.533V9.025l.008-.09a.5.5 0 0 1 .492-.412zM14 14v3.5h-4V14H6.5v-4H10V6.5h4V10h3.5v4H14z'/>
    </SvgIcon>
  );
}

function QuarantineChip() {
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
            label="Quarantine offers" 
            color="primary"
            ref={anchorRef}
            onDelete={handleToggle}
            onClick={handleToggle}
            icon={<QuarantineIcon/>} 
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
                  <FormControl sx={{ p: 2 }} >
                    <FormLabel id="demo-radio-buttons-group-label">Which properties would you like to view?</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={quarantine}
                      name="radio-buttons-group"
                      onChange={handleQuarantineChange}
                    >
                      <FormControlLabel value="all" control={<Radio size="small"/>} label="All Hotels" />
                      <FormControlLabel value="quarantine" control={<Radio size="small"/>} label="Quarantine hotels" />
                      <FormControlLabel value="non" control={<Radio size="small"/>} label="Non-quarantine hotels" />
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
export default  QuarantineChip