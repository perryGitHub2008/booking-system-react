
const getLocalRefreshToken =() =>{
    return localStorage.getItem("refreshToken");
}
const getLocalAccessToken= () =>{
    return localStorage.getItem("authenticationToken");
}
const updateLocalAccessToken = (token) =>{
    localStorage.setItem("authenticationToken", token);
}
const getUser= () =>{
    return localStorage.getItem("username");
}
const setUser=(user) =>{
    localStorage.setItem('authenticationToken',user['authenticationToken']);
    localStorage.setItem('expiresAt',user['expiresAt']);
    localStorage.setItem('refreshToken',user['refreshToken']);
    localStorage.setItem('username',user['username']);
}
const removeUser=() =>{
    localStorage.clear();
}


const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser
};
export default TokenService;