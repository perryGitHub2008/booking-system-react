import { createContext, useState } from "react";
import { useContext } from "react";

const ProfileContext = createContext({});

export function useProfile() {
    return useContext(ProfileContext);
}

export const ProfileProvider = ({children}) =>{
    const [profile, setProfile] = useState({});

    return (
        <ProfileContext.Provider value ={{profile, setProfile}}>
            {children}
        </ProfileContext.Provider>
    )
}
export default ProfileContext
