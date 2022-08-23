
const getLocalRefreshToken =() =>{
    return localStorage.getItem("refreshToken");
}
const getLocalAccessToken= () =>{
    return localStorage.getItem("authenticationToken");
}
const updateLocalAccessToken = (token) =>{
    localStorage.setItem("authenticationToken", token);
}
const getUsername= () =>{
    return localStorage.getItem("id");
}
const setUser=(user) =>{
    localStorage.setItem('authenticationToken',user['authenticationToken']);
    localStorage.setItem('expiresAt',user['expiresAt']);
    localStorage.setItem('refreshToken',user['refreshToken']);
    localStorage.setItem('name',user['name']);
    localStorage.setItem('id',user['id']);
}
const removeUser=() =>{
    localStorage.clear();
}


const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUsername,
    setUser,
    removeUser
};
export default TokenService;