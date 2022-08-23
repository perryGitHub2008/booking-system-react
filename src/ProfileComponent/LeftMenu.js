import React from 'react'
import { ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link } from 'react-router-dom';

function LeftMenu() {
    return (
        <MenuList>
            <MenuItem component={Link} to="/mybooking">
                <ListItemIcon>
                    <EventAvailableIcon/>
                </ListItemIcon>
                <ListItemText>
                    My Booking
                </ListItemText>
            </MenuItem>
            {/*<MenuItem>
                <ListItemIcon>
                    <StarBorderIcon/>
                </ListItemIcon>
                <ListItemText>
                    Reviews
                </ListItemText>
    </MenuItem>*/}
            <MenuItem component={Link} to="/profile">
                <ListItemIcon>
                    <PermIdentityIcon/>
                </ListItemIcon>
                <ListItemText>
                    My Profile
                </ListItemText>
            </MenuItem>
        </MenuList>
    )
}

export default LeftMenu