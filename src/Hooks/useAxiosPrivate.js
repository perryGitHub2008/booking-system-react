import axios from "../Service/api"
import { useEffect } from "react"
import { useAuth } from "../Context/AuthProvider";
const useAxiosPrivate = () =>{
    const {id} = useAuth();

    useEffect(()=>{

        const request = axios.interceptors.request.use(
            (config) => {
              return config;
            },
            (error) => {

              return Promise.reject(error);
            }
        );
        
        const response = axios.interceptors.response.use(
            (res) => {
            return res;
            },
            async (err) => {
                const originalConfig = err.config;
                if (originalConfig.url !== "/account/signup" && err.response) {
                    // Access Token was expired
            
                    if (err.response.status === 500 && !originalConfig._retry) {
                        originalConfig._retry = true;
                        try {
                            await axios.post("/account/refresh/token", id,{withCredentials: true});
                            return axios(originalConfig);
                        } catch (_error) {
                            return Promise.reject(_error);
                        }
                    }
                }
                return Promise.reject(err);
            }
        );

        return () =>{
            axios.interceptors.request.eject(request)
            axios.interceptors.response.eject(response)
        }
    },[])

    return axios;
}

export default useAxiosPrivate