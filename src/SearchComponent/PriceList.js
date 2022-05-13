import {useState,useRef, useEffect} from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import Chip from '@mui/material/Chip';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

function calculateValue(value) {
  return value;
}
function PriceChip() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [price, setPrice] = useState({start:0, end:15720});

  const handleChange = (event, newValue) => {
    setPrice({...price, start: Number(newValue[0]),end :Number(newValue[1]) })
  };

  const handleStartChange = (event) => {
    if(event.target.value === '')
    setPrice({...price, start: ''})
    else 
    setPrice({...price, start: Number(event.target.value)})
  };
  const handleEndChange = (event) => {
    if(event.target.value === '')
    setPrice({...price, end: ''})
    else 
    setPrice({...price, end: Number(event.target.value)})
  };
  const handleStartBlur = () => {
    if (price['start'] < 0) {
      setPrice({...price, start: 0})
      setPrice(price);
    } else if (price['start'] > 15720) {
      setPrice({...price, start: 15720})
    }
  };
  const handleEndBlur = () => {
    if (price['end'] < 0) {
      setPrice({...price, start: 0})
      setPrice(price);
    } else if (price['end'] > 15720) {
      setPrice({...price, start: 15720})
    }
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
            label="Price" 
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
                  <Box sx={{ p: 2, width:350}}>
                    <FormLabel id="demo-radio-buttons-group-label">Price per night</FormLabel>
                    <Slider
                      value={Object.values(price)}
                      min={0}
                      step={1}
                      max={15720}
                      scale={calculateValue}
                      onChange={handleChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="non-linear-slider"
                    />
                    <TextField 
                      label='MIN'
                      value={price['start']}
                      size="small"
                      onChange={handleStartChange}
                      onBlur={handleStartBlur}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">HKD</InputAdornment>
                      }}
                      inputProps={{
                        step: 10,
                        min: 0,
                        max: 15720,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                      }}
                    />
                    <TextField
                      value={price['end']}
                      label="MAX" 
                      size="small"
                      onChange={handleEndChange}
                      onBlur={handleEndBlur}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">HKD</InputAdornment>
                      }}
                      inputProps={{
                        step: 10,
                        min: 0,
                        max: 15720,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                      }}
                    />
                    <Divider sx={{pt:1}}/>
                    <FormGroup sx={{pt:1}}>
                      <FormLabel id="demo-radio-buttons-group-label">Deals and discounts</FormLabel>
                      <FormControlLabel control={<Checkbox size="small" />} label="50% discount or more" />
                      <FormControlLabel control={<Checkbox size="small" />} label="2X AgodaCash" />
                      <FormControlLabel control={<Checkbox  size="small"/>} label="Secret deals" />
                    </FormGroup>
                    
                  </Box>
                </Paper>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

  );
}
export default  PriceChip