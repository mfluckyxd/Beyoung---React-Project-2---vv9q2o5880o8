import axios from "axios";
import { headerWithProjectIdOnly, apiURL, headerWithJWT } from "./getHeaders";

export const loginAPI = async (userInfo) => {
  const headers = headerWithProjectIdOnly();

  try {
    const res = await axios.post(`${apiURL}/user/login`, userInfo, headers);
    if (res.data.token) {
        
        localStorage.setItem('authToken', res.data.token);
        localStorage.setItem('username', res.data.data.name);
        localStorage.setItem('useremail', res.data.data.email);
    }
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const signupAPI = async (userInfo) => {
  const headers = headerWithProjectIdOnly();
  try {
    const res = await axios.post(`${apiURL}/user/signup`, userInfo, headers);
   
    if (res.data.token) {
        
        localStorage.setItem('authToken', res.data.token);
        localStorage.setItem('username', res.data.data.user.name);
        localStorage.setItem('useremail', res.data.data.user.email);
    }
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateCredentialsAPI = async(body)=>{
  const headers = headerWithJWT();

  try {
    const res = await axios.patch(`${apiURL}/user/updateMyPassword`,body,headers)
    return res.data
  } catch (error) {
    
    
    return error.response.data
    
  }
  

}
