import api from "./api";


const getUserProfile = (data) => {
  return api
    .post('/account/profile/userProfile', data);
};

const updateName = (data) =>{
  return api
    .post('/account/profile/updateName', data);
}

const changePW = (data) =>{
  return api
    .post('/account/profile/changePW', data);
}

const changePhone = (data) =>{
  return api
    .post('/account/profile/changePhone', data);
}

const VerifyEmail = (data) =>{
  return api
    .post('/account/resendAccountVerificationMail');
}
const userService = {
    getUserProfile,
    updateName,
    changePW,
    changePhone,
    VerifyEmail,
};

export default userService;