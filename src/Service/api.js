import axios from "axios";
const instance = axios.create({
  baseURL: "http://perryreact.asuscomm.com:8082/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;