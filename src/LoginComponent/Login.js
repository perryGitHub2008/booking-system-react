import { Typography, TextField, Button, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useFormik } from "formik";
import * as yup from "yup"; 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import{Link, Navigate, useNavigate} from 'react-router-dom'
import { useAuth } from '../Context/AuthProvider';
import { useProfile } from '../Context/ProfileProvider';
import axios from '../Service/api';

const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(7, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
});
  
function Login(props){
    const {id, setID} = useAuth();
    const {setProfile} = useProfile();
    const history = useNavigate();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const postData = {username: values.email, password: values.password}
            try{
                const rs = await axios.post("/account/login",postData,{withCredentials: true})
                setID(rs.data.id)
                setProfile(prev=>{
                    return {...prev, firstName: rs.data.firstName, lastName:rs.data.lastName}
                })
                history(-1)
            } catch (err){
                setOpen(true);
            }
        },
    });
    return (
        id === "" ? (
        <>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
            {"Sign in"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Email or Password is incorrect.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} autoFocus>
                OK
            </Button>
           
            </DialogActions>
        </Dialog>
        <Paper elevation={3} sx={{p:3,mt:8,mx: "auto", width: 400 }}>
            <Typography variant="h5" gutterBottom>
            Sign in
                <Typography variant="subtitle1" gutterBottom>

                    For security, please sign in to access your information
                </Typography>
            </Typography>
            <Typography variant="subtitle1" >

                Email
            </Typography>
            <TextField 
            sx={{width:'100%'}} 
            id="email" 
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email} />
            <Typography variant="subtitle1" sx={{mt:2}}>

                Password
            </Typography>
            <TextField 
            sx={{width:'100%'}} 
            id="password" 
            variant="outlined"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password} />
            <Button onClick={formik.handleSubmit} variant="contained" sx={{mt:2, width:'100%'}}>Sign in</Button>
            <Box sx={{display:'flex',flexWrap:'warp',mt:2 }}>
            <Typography component={Link} to={'/Register'} variant="subtitle1" sx={{width:'50%', textDecoration: 'none'}}>
                Create account
            </Typography>
            <Typography variant="subtitle1" sx={{width:'50%' }} style={{textAlign: 'center'}}>
                <LockOpenIcon fontSize='small' />Forget Password?
            </Typography>
            </Box>
        </Paper>
        </>
        ):(
            <Navigate  to="/profile" replace={true}/>
        )
    );
}
export default Login