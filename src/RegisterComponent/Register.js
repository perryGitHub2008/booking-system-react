import { Typography, TextField, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useFormik } from "formik";
import * as yup from "yup"; 
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axios from '../Service/api';

const validationSchema = yup.object({
    firstName: yup
        .string('Enter your email')
        .required('Please enter a valid first name (English only).'),
    lastName: yup
        .string('Enter your email')
        .required('Please enter a valid first name (English only).'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Password is required'),
});
  
function Register(props){
    const history = useNavigate();
    const [open, setOpen] = useState(false);
    const [register,setRegister] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        history("../");
        window.location.reload();
    };
    const formik = useFormik({
        initialValues: {
            firstName:'',
            lastName: '',
            email: '',
            password: '',
            confirmPassword:''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const postData = {firstname:values.firstName, lastname: values.lastName, email: values.email, password: values.password};

            await axios.post("/account/signup",postData,{withCredentials: true})
                        .then(()=> setRegister(true))
                        .catch((error) => {

                        });
            handleClickOpen();
        },
    });
    return (
        <>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Sign up"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {register? (`Verification email has been sent to ${formik.values.email}. Just follow the instructions inside. Please go https://mailtrap.io/ and use testing20082009@gmail.com : abcd1234 to login`
                ) : "Email has been registered"}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            {register?(
                <Button onClick={handleClose} autoFocus>
                    OK
                </Button>
            ) : (
                <Button onClick={()=>setOpen(false)} autoFocus>
                    OK
                </Button>
            ) }
            </DialogActions>
        </Dialog>
        <Paper elevation={3} sx={{p:3,mt:8,mx: "auto", width: 400 }}>
            <Typography variant="h5" gutterBottom>
            Sign up
                <Typography variant="subtitle1" gutterBottom>

                    For security, please sign in to access your information
                </Typography>
            </Typography>
            <Typography variant="subtitle1" >
                First name
            </Typography>
            <TextField 
            sx={{width:'100%'}} 
            id="firstName" 
            variant="outlined"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}  />
            <Typography variant="subtitle1" >
                Last name
            </Typography>
            <TextField 
            sx={{width:'100%'}} 
            id="lastName" 
            variant="outlined"
            value={formik.values.lastName}
            onChange={formik.handleChange} 
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName} />
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
            <Typography variant="subtitle1" sx={{mt:2}}>
            Confirm Password
            </Typography>
            <TextField 
            sx={{width:'100%'}} 
            id="confirmPassword" 
            variant="outlined"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword} />
            <Button onClick={formik.handleSubmit} variant="contained" sx={{mt:2, width:'100%'}}>Sign in</Button>

        </Paper>
        </>
    );
}
export default Register