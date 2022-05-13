import api from "./api";
import TokenService from "./tokenService";

const registerService = (data) => {
  return api
    .post('/account/signup', data);
};

const loginService = (data)=> {
  return api.post("/account/login", 
            data
        )
        .then(response => {
            if (response.data['authenticationToken']) {
            TokenService.setUser(response.data);
            }
            return response.data;
        });
};

const logoutService = () => {
    TokenService.removeUser();
};

const getCurrentUser = () => {
    return TokenService.getUser();
};

const AuthService = {
        registerService,
        loginService,
        logoutService,
        getCurrentUser,
};

export default AuthService;