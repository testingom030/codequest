import * as api from '../api';
import { setcurrentuser } from './currentuser';
import { fetchallusers } from './users';
export const signup =(authdata,navigate)=> async(dispatch)=>{
    try {
        const{data}=await api.signup(authdata);
        dispatch({type:"AUTH",data})
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        dispatch(fetchallusers())
        navigate("/")
        return { success: true }
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong..."
        return { success: false, error: errorMessage }
    }
}
export const login =(authdata,navigate)=> async(dispatch)=>{
    try {
        const{data}=await api.login(authdata);
        dispatch({type:"AUTH",data})
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        navigate("/")
        return { success: true }
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Invalid credentials"
        return { success: false, error: errorMessage }
    }
}