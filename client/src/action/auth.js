import * as api from '../api';
import { setcurrentuser } from './currentuser';
import { fetchallusers } from './users';
export const signup =(authdata,navigate)=> async(dispatch)=>{
    try {
        const{data}=await api.signup(authdata);

        if (data.success) {
            // Don't dispatch SET_CURRENT_USER yet, wait for OTP verification
            return { success: true };
        }
        return { success: false, error: data.message };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data?.message || 'Something went wrong!'
        };
    }
}
export const verifyOtp = (verificationData) => async (dispatch) => {
    try {
        const { data } = await api.verifyOtp(verificationData);

        if (data.success) {
            dispatch({ type: 'SET_CURRENT_USER', payload: data.result });
            return { success: true };
        }
        return { success: false, error: data.message };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'OTP verification failed!'
        };
    }
}