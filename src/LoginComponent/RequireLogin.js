import {useLocation, Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
const RequireLogin = () =>{
    const {id} = useAuth();
    const location = useLocation();

    return (
        id!=="" ? <Outlet/> : <Navigate to="/login" state= {{from : location}} replace />
    )
}

export default RequireLogin;