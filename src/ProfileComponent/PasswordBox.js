import { Paper, Typography, Button, FormControl, OutlinedInput,Box } from '@mui/material'
import React, { useState } from 'react'
import { Formik } from "formik";
import * as yup from "yup"; 
import useAxiosPrivate from '../Hooks/useAxiosPrivate';

const validationSchema = yup.object({
    currentPw: yup
      .string('- Enter your current password')
      .required('- Current password is required'),
    newPW: yup
      .string('- Enter your new password')
      .min(7, '- Your new password must be at least 8 characters long.')
      .required('- New password is required')
      .notOneOf([yup.ref('currentPw'), null], '- The passwords you provided is same as current. Please type another password again.'),
    confirmNewPW: yup
      .string('- Re-enter your password')
      .min(7, '- Password should be of minimum 8 characters length')
      .required('- Password is required')
      .oneOf([yup.ref('newPW'), null], '- The passwords you provided do not match. Please check that you have typed both passwords correctly.')
});
  
function PasswordBox() {
    const [edit, setEdit] = useState(false);
    const [currentPwError, setCurrentPwError] = useState("");
    const [showSaved, setShowSaved] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    return (
        !edit ? (
            <Paper sx={{mt:2, p:3, display:'flex'}}>
                <Typography>
                    Password
                    <Typography variant='h6'>
                        ●●●●●●●●●●
                    </Typography>
                </Typography>
                <Button onClick={()=>setEdit(true)} sx={{ml:'auto'}}>
                    Edit
                </Button>
            </Paper>
        ) : (
            <Formik
                initialValues= {{
                    currentPw: '',
                    newPW: '',
                    confirmNewPW: '',
                    }}
                validationSchema= {validationSchema}
                onSubmit= { async (values) => {
                    const postData = {currentPw: values.currentPw, newPW: values.newPW}
                    try {
                        await axiosPrivate.post('/account/profile/changePW',postData,{withCredentials:true});
                        setEdit(false)
                    } catch (error) {
                        setCurrentPwError("- The password you entered is incorrect. Please enter your current password.")
                    }
                }}
            >
                {({
                    values, errors, touched, handleSubmit, handleChange,
                }) => {
                    const length = currentPwError!== "" ? ( Object.keys(errors).length +1) : (Object.keys(errors).length)
                    return (
                        <Paper sx={{mt:2, p:3, display:'flex', flexDirection:'column' }}>
                            {length>0 && 
                                <Box severity="error" sx={{width:'46%', backgroundColor:'rgb(242, 222, 222)', p:2, color:'rgb(169, 68, 66)'}}>
                                    <Typography variant='body2' sx={{lineHeight:'2.04'}}>
                                    Something went wrong :
                                    </Typography>
                                    <Typography variant='body2' sx={{lineHeight:'2.04'}}>
                                        {errors.currentPw}
                                    </Typography>
                                    <Typography variant='body2' sx={{lineHeight:'2.04'}}>
                                        {errors.newPW}
                                    </Typography>
                                    <Typography variant='body2' sx={{lineHeight:'2.04'}}>
                                        {errors.confirmNewPW}
                                    </Typography>
                                    <Typography variant='body2' sx={{lineHeight:'2.04'}}>
                                        {currentPwError}
                                    </Typography>
                                </Box>
                            }
                            <FormControl variant="standard" sx={{width:'50%'}}>
                                <Typography variant='body2'>
                                    Current password
                                </Typography>
                                <OutlinedInput 
                                    placeholder="Current password" 
                                    sx={{mt:2}} 
                                    id="currentPw" 
                                    value={values.currentPw}
                                    onChange={handleChange}
                                    error={touched.currentPw && Boolean(errors.currentPw)}
                                    />
                            </FormControl>
                            <FormControl variant="standard" sx={{width:'50%'}}>
                                <Typography variant='body2' sx={{mt:2}}>
                                    New password
                                </Typography>
                                <OutlinedInput 
                                    placeholder="New password" 
                                    sx={{mt:2}} 
                                    id="newPW" 
                                    value={values.newPW}
                                    onChange={handleChange}
                                    error={touched.newPW && Boolean(errors.newPW)}/>
                            </FormControl>
                            <FormControl variant="standard" sx={{width:'50%'}}>
                                <Typography variant='body2' sx={{mt:2}}>
                                    Confirm new password
                                </Typography>
                                <OutlinedInput 
                                    placeholder="Confirm new password" 
                                    sx={{mt:2}} 
                                    id="confirmNewPW" 
                                    value={values.confirmNewPW}
                                    onChange={handleChange}
                                    error={touched.confirmNewPW && Boolean(errors.confirmNewPW)} />
                            </FormControl>
                            <Box sx={{mt:2}}>
                                <Button sx={{px:5}} onClick={()=>setEdit(false)}>
                                    Cancel
                                </Button>
                                <Button sx={{px:5}} variant='contained' onClick={handleSubmit}>
                                    Save
                                </Button>
                            </Box>
                        </Paper>
                    )}}
            </Formik>

        )
    )
}

export default PasswordBox