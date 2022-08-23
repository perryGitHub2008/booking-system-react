import { createContext } from "react";
import { useContext } from "react";
import useLocationStorage from "../Hooks/useLocationStorage";

const AuthContext = createContext({});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [id, setID] = useLocationStorage('id');

    return (
        <AuthContext.Provider value ={{id, setID}}>
            {children} 
        </AuthContext.Provider>
    )
}

export default AuthContext;