import * as api from '../api';
import { setcurrentuser } from './currentuser';
import { fetchallusers } from './users';
export const signup =(authdata,navigate)=> async(dispatch)=>{
    try {
        const{data}=await api.signup(authdata);
        if(data.success){
            return { success: true }
        }
        return { success: false, error: data.message };
    } catch (error) {
        console.error('Error in signup:', error);
        return { 
            success: false, 
            error: error.message || 'Something went wrong! Please try again.' 
        };
    }
}
export const verifyOtp = (verificationData) => async (dispatch) => {
    try {
        const { data } = await api.verifyOtp(verificationData);
        
        if (data.success) {
            dispatch({ type: 'AUTH', data: data.result });
            return { success: true };
        }
        return { success: false, error: data.message };
    } catch (error) {
        console.error('Error in OTP verification:', error);
        return { 
            success: false, 
            error: error.message || 'OTP verification failed! Please try again.' 
        };
    }
};
export const login = (authdata, navigate) => async (dispatch) => {
    try {
        const { data } = await api.login(authdata);
        
        if (data.success) {
            // Store user data in localStorage
            localStorage.setItem('Profile', JSON.stringify(data.result));
            
            // Update Redux store
            dispatch({ type: 'AUTH', data });
            dispatch(setcurrentuser(data.result));
            
            // Navigate to home page
            navigate('/');
            return { success: true };
        } else {
            return { 
                success: false, 
                error: data.message || 'Login failed'
            };
        }
    } catch (error) {
        console.error('Error in login:', error);
        return { 
            success: false, 
            error: error.response?.data?.message || error.message || 'Invalid credentials'
        };
    }
}