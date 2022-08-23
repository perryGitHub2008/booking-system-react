import { Paper, FormControl, OutlinedInput, Typography, Avatar, Button, Box } from '@mui/material'
import React, { useState } from 'react'
import { useProfile } from '../Context/ProfileProvider';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';

function NameBox() {
    const {profile,setProfile} = useProfile();
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState({
        firstName:profile.firstName,
        lastName:profile.lastName
    })
    const axiosPrivate = useAxiosPrivate();
    const handleChange = (prop) => (event) => {
        setName({ ...name, [prop]: event.target.value });
    };

    const saveClicked = async ()=>{
        try {
            await axiosPrivate.post('/account/profile/updateName', name,{withCredentials:true});
            setProfile(prev=>{
                return {...prev, firstName: name.firstName, lastName:name.lastName}
            })
            setEdit(false);
        } catch (error) {
            console.error(error.message);
        }
    }
    const handleCanceled = () =>{
        setEdit(false);
        setName({firstName:profile.firstName,
            lastName:profile.lastName})
    }

    return (
            edit ? (
                <Paper sx={{mt:1, p:2, display:'flex', flexDirection:'column' }}>
                    <FormControl variant="standard" sx={{width:'50%'}}>
                        <Typography variant='body2'>
                            First Name
                        </Typography>
                        <OutlinedInput 
                            sx={{mt:2}} 
                            id="component-simple" 
                            value={name.firstName} 
                            onChange={handleChange('firstName')} />
                    </FormControl>
                    <FormControl variant="standard" sx={{width:'50%'}}>
                        <Typography variant='body2' sx={{mt:2}}>
                            Last Name
                        </Typography>
                        <OutlinedInput 
                            sx={{mt:2}} 
                            id="component-simple" 
                            value={name.lastName} 
                            onChange={handleChange('lastName')} />
                    </FormControl>
                    <Box sx={{mt:2}}>
                        <Button sx={{px:5}} onClick={()=>handleCanceled()}>
                            Cancel
                        </Button>
                        <Button sx={{px:5}} variant='contained' onClick={()=>saveClicked()}>
                            Save
                        </Button>
                    </Box>
                </Paper>
            ) : (
                <Paper sx={{mt:1, p:3, display:'flex'}}>
                    <Avatar alt={`${name.lastName} ${name.firstName}`} src="/static/images/avatar/1.jpg" sx={{ width: 56, height: 56 }} />
                    <Typography sx={{p:1,ml:1}}>
                        Name
                        <Typography variant='h6'>
                            {name.lastName} {name.firstName}
                        </Typography>
                    </Typography>
                    <Button onClick={()=>setEdit(true)} sx={{marginLeft:'auto'}}>
                        Edit
                    </Button>
                </Paper>
            )
            
    )
}

export default NameBox