import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8082/api",
  headers: {
    "Content-type": "application/json"
  }
});

export const registerService = (data) => {
  return api
    .post('/account/signup',data)
};

export const loginService = (data)=> {
  return api.post('account/login',data)
};