import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import LeftMenu from "./LeftMenu";
import NameBox from "./NameBox";
import { useEffect, useState } from "react";
import EmailBox from "./EmailBox";
import PhoneBox from "./PhoneBox";
import PasswordBox from "./PasswordBox";
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
import { useNavigate } from "react-router-dom";
import { useProfile } from '../Context/ProfileProvider';
function ProfileContainer() {
    const [loading, setLoading] = useState(true);
    const {setProfile} = useProfile();
    const axiosPrivate = useAxiosPrivate();
    const history = useNavigate();

    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const {data: response} = await axiosPrivate.get("/account/profile/userProfile",{withCredentials: true})
                setProfile(response)
            } catch (error) {
                console.error("error:"+ error.message);
                history("/login")
            }
            setLoading(false);
        }
        fetchData();
    },[])

    
    return (
        !loading && (
            <Box sx={{ width: 1080, mt: 0.5, marginLeft: 'auto', marginRight: 'auto', display:"flex" }}>
                <Box sx={{width:'25%', height:'inherit', boxShadow:'7px 0 8px #e9ebee'}}>
                    <LeftMenu/>
                </Box>
                <Box sx={{width:'70%', p:3}}>
                    <Typography variant="h5">
                        User details
                    </Typography>
                    <NameBox/>
                    <EmailBox/>
                    <PhoneBox/>
                    <PasswordBox/>
                </Box>
            </Box>
        )
    )
}

export default ProfileContainer;