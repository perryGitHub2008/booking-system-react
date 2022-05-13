import { Fragment, useState } from "react";
import Box from '@mui/material/Box';
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

function TravelerSelector () {

    const [traveler, setTraveler] = useState([{Adults:2,Children:0}]);
    const [open, setOpen] = useState(false);

    const handleListOpen = () => {
        setOpen((prev) => !prev);
    };
    
    const handleListClose = () => {
        setOpen(false);
    };
    const handleAdd = () => {
        setTraveler(traveler+1)
    };
    const handleRemove = () => {
        if(traveler > 0){
            setTraveler(traveler-1)
        }
    };
    const handleAddRoom = ()=>{
        setTraveler(traveler=>{
            const newTraveler = {Adults:2,Children:0}
            return [...traveler, newTraveler];
        });
    };
    const totalTraveler =()=>{
        const adults = traveler.reduce((prev, curr) =>
        { return prev + curr.Adults+ curr.Children}, 0);
        console.log(adults);
        return adults;
    };
    const roomList = traveler.map((data,index)=>{
        return(
            <Fragment key={index}>
            <ListItem>
                <ListItemText id="list-label-adults" primary="Adults:" />
                <IconButton onClick={handleRemove}>
                    <RemoveCircleOutlineIcon/>
                </IconButton>
                {data.Adults}
                <IconButton onClick={handleAdd}>
                    <AddCircleOutlineIcon/>
                </IconButton>
            </ListItem>
            <ListItem>
                <ListItemText id="list-label-children" primary="Children:" />
                <IconButton onClick={handleRemove}>
                    <RemoveCircleOutlineIcon/>
                </IconButton>
                {data.Children}
                <IconButton onClick={handleAdd}>
                    <AddCircleOutlineIcon/>
                </IconButton>
            </ListItem>
            <Divider />
            </Fragment>
          ); 
    });

    return (
        <ClickAwayListener onClickAway={handleListClose}>
        <Box >
            <Box sx={{border:1, borderColor:'grey.700',borderRadius:'4px'}}>
                <Button onClick={handleListOpen} sx={{ color: 'grey.900', background: 'none', width:1, height:'56px'}}>
                    {traveler.length} Room
                    {totalTraveler()}
                </Button>
            </Box>
            {open ? (
            <Box sx={{background:'white',borderRadius:'4px'}}>
                <Typography variant="h6" sx={{p:1}}>
                    Room 1
                </Typography>
                <List>
                    {roomList}
                    <Button onClick={handleAddRoom} sx={{width:1, py:'10px'}}>
                        Add a Room
                    </Button>
                    <Divider />
                    <ListItem>
                        <ListItemText id="list-label-children" primary="Children:" />
                    </ListItem>
                </List>
            </Box>
            ) : null}
        </Box>
        </ClickAwayListener>
    );
}

export default TravelerSelector;
