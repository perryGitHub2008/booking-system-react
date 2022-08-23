import { Button, Paper, Typography, FormControl, OutlinedInput, Autocomplete,Box, TextField } from '@mui/material'
import React, { useState } from 'react'
import CountryList from '../CountryList';
import { useFormik } from "formik";
import * as yup from "yup"; 
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
import { useProfile } from '../Context/ProfileProvider';
const validationSchema = yup.object({
    countryCode: yup
      .string('- Enter your current password')
      .required('- Current password is required'),
    phone: yup
      .string('- Enter your new password')
      .min(5, '- Your new password must be at least 8 characters long.')
      .required('- New password is required')
});
function PhoneBox() {
    const [edit, setEdit] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const {profile} = useProfile();


    const formik = useFormik({
        initialValues: {
            countryCode: profile.countrycode,
            phone: profile.phone,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const postData = {countryCode: values.countryCode, phone: values.phone}
            try {
                await axiosPrivate.post('/account/profile/changePhone',postData,{withCredentials:true});
                setEdit(false)

            } catch (error) {

            }
        },
    });

    const handleCanceled = () =>{
        setEdit(false);
        formik.setFieldValue('countryCode', "")
        formik.setFieldValue('phone', "")

    }
    return (
        edit ? (
            <Paper sx={{mt:2, p:3}}>
                <FormControl variant="standard" sx={{width:'50%'}}>
                    <Typography variant='body2'>
                        Country/region calling code
                        {console.log(formik.errors)}
                    </Typography>
                    <Autocomplete
                        sx={{mt:2, display:'inline-block'}}
                        id="countryCode"
                        label="Country/region of residence"
                        value={CountryList.searchByMobileCode(formik.values.countryCode)}
                        options={CountryList.getList()}
                        getOptionLabel={(option) => option.name + " (" + option.mobileCode + ")"}
                        onChange={(event, newValue) => {
                            formik.setFieldValue('countryCode', newValue.mobileCode)

                        }}
                        renderOption={(props, option) => (
                        <li {...props}>
                            <Box>
                                <Typography>
                                {option.name} ({option.mobileCode})
                                </Typography>
                            </Box>
                        </li>
                        )}
                        renderInput={(params) => <TextField {...params}
                        label="--Please select your country/region calling code--"
                        error={formik.touched.countryCode && Boolean(formik.errors.countryCode)}
                        helperText={formik.touched.countryCode && formik.errors.countryCode} />}
                    />
                    <Typography variant='body2' sx={{mt:2}}>
                        Phone number
                    </Typography>
                    <OutlinedInput 
                        sx={{mt:2}} 
                        id="phone" 
                        value={formik.values.phone} 
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        />
                </FormControl>
                <Box sx={{mt:2}}>
                    <Button sx={{px:5}} onClick={()=>handleCanceled()}>
                        Cancel
                    </Button>
                    <Button sx={{px:5}} variant='contained' onClick={formik.handleSubmit}>
                        Save
                    </Button>
                </Box>
            </Paper>
        ) : (         
            formik.values.phone==="" ? (
                <Paper sx={{mt:2, p:3}}>
                    <Typography>
                        Phone number
                        <Button onClick={()=>setEdit(true)} sx={{float:'right'}}>
                            Add
                        </Button>
                    </Typography>
                </Paper>
            ) : (
            <Paper sx={{mt:2, p:3, display:'flex', flexWrap:'wrap'}}>
                <Typography sx={{width:'100%'}}>
                    Phone number
                </Typography>
                <Typography sx={{mt:1}}>
                    {formik.values.countryCode} {formik.values.phone}
                </Typography>
                <Button onClick={()=>setEdit(true)} sx={{ml:'auto'}}>
                    Edit
                </Button>
            </Paper>
            ) 
        )  
    )
}

export default PhoneBox