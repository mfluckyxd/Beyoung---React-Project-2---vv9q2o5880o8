import axios from "axios";
import { headerWithProjectIdOnly, apiURL, headerWithJWT } from "./getHeaders";
import { toast } from "react-toastify";

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

export const updateProfileInfo = async(body, type)=>{
  const headers = headerWithJWT();
  let requestUrl = apiURL;
  if (type=="password") {
    requestUrl +="/user/updateMyPassword";
  }else if (type=="username") {
    requestUrl +="/user/updateme"
  }else{
    toast.error("Something went wrong")
    return;
  }

  try {
    const res = await axios.patch(requestUrl,body,headers)
    return res.data
  } catch (error) {
    
    
    return error.response.data
    
  }
  

}
