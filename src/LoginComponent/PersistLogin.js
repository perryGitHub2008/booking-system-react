import { Outlet} from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthProvider";
import { useProfile } from '../Context/ProfileProvider';
import axios from '../Service/api';

const PersistLogin = () =>{
    const [isLoading, setIsLoading] = useState(true);
    const {id, setID} = useAuth();
    const {setProfile} = useProfile();

    useEffect(()=>{
        const verfiyRefreshToken = async ()=>{
            try {
                const rs = await axios.post("/account/refresh/token", 
                id
                ,{withCredentials: true});
                setID(rs.data.id)
                setProfile(prev=>{
                    return {...prev, firstName: rs.data.firstName, lastName:rs.data.lastName}
                })
            } catch (err){
                setID("")
                setProfile({})

            } finally{
                setIsLoading(false)
            }
        }
        id !== "" ? verfiyRefreshToken() : setIsLoading(false)
    },[])

    return  (
        isLoading ? <div>"Loading"</div> : <Outlet/>
    )
}

export default PersistLogin;