import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';
import axios from '../Service/api';
import { useProfile } from '../Context/ProfileProvider';

function Logout() {
    const {setID} = useAuth();
    const [loading, setLoading] = useState(true);
    const history = useNavigate();
    const {setProfile} = useProfile();

    useEffect(()=>{

        const fetchData = async () =>{
            try {
                
                await axios.post("/account/logout","",{withCredentials: true})
                setID("");
                setProfile({})
            } catch (error) {
                console.error("error:"+ error.message);
            }
            history("/")
            setLoading(false);
        }
        fetchData();
    },[])

    return (
        loading && <div>loading</div>
    )
}

export default Logout