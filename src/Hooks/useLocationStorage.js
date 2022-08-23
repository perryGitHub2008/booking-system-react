import { useEffect, useState } from "react";


export default function useLocationStorage(key, passValue) {
    const [value, setValue] = useState(()=>{
        const jsonValue = localStorage.getItem(key);
        if(jsonValue==="undefined")
            return ""
        if(jsonValue !=null) 
            if(key === "id" && !Number.isInteger(parseInt(jsonValue)))
                return ""
            else 
                return JSON.parse(jsonValue);
        if(typeof passValue === 'function'){
            return passValue()
        } else {
            return passValue
        }
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[value, key])

    return [value,setValue];
}
