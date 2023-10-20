import axios from "axios";
import { headerWithProjectIdOnly, apiURL } from "./getHeaders";

export const loginAPI = async (userInfo) => {
  const headers = headerWithProjectIdOnly();

  try {
    const res = await axios.post(`${apiURL}/user/login`, userInfo, headers);
    if (res.data.token) {
        
        localStorage.setItem('authToken', res.data.token);
    }
    // console.log(res.data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const signupAPI = async (userInfo) => {
  const headers = headerWithProjectIdOnly();
  try {
    // console.log(`${apiURL}/user/signup`, headers, userInfo);
    const res = await axios.post(`${apiURL}/user/signup`, userInfo, headers);
    // console.log(res.data.data);
    if (res.data.token) {
        
        localStorage.setItem('authToken', res.data.token);
    }
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
