import { Alert, Paper, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import useAxiosPrivate from '../Hooks/useAxiosPrivate'
import { useAuth } from '../Context/AuthProvider'
import { useProfile } from '../Context/ProfileProvider';

function EmailBox(props) {
    const [mailSent, setMailSent] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const {id} = useAuth();
    const {profile} = useProfile();
    const handleVerifyEmail = async () =>{
        try {
            await axiosPrivate.post('/account/resendAccountVerificationMail',id,{withCredentials:true});
            setMailSent(true);
        } catch (error) {
            
        }
    }
    return (
        !mailSent ? (
            <Paper sx={{p:3,mt:2}}>
                <Box>
                    <Typography>
                        Email
                    </Typography>
                    {!profile.verification &&
                    <Alert sx={{mt:1, width:'50%', display:'flex'}} variant="outlined" severity="warning"> 
                        Your email hasn’t been verified. 
                        <Button sx={{px:1,py:0}} onClick={()=>handleVerifyEmail()}>
                            Verify email
                        </Button>
                    </Alert>
                    }
                    <Typography sx={{mt:1}} variant="body1">
                        {profile.username}
                    </Typography>
                </Box>
            </Paper>
        ) : (
            <Paper sx={{p:3,mt:2}}>
                <Box>
                    <Typography>
                    Verification email has been sent to {props.profile.username}.
                     Just follow the instructions inside. Didn’t receive the email? 
                     Resend email
                    </Typography>
                </Box>
            </Paper>
        )

    )
}

export default EmailBox