import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "https://backend-sigma-ashen-62.vercel.app",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true,
    timeout: 15000, // Increased timeout
    retry: 3, // Number of retry attempts
    retryDelay: 1000 // Delay between retries in milliseconds
});

// Add request interceptor for authentication
API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`;
    }
    return req;
});

// Add response interceptor for better error handling
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, response: { status } } = error;
        
        // Retry the request if it failed due to network issues
        if (!config || !config.retry) return Promise.reject(error);
        
        if (status === 408 || status === 500) {
            config.retryCount = config.retryCount || 0;
            
            if (config.retryCount >= config.retry) {
                return Promise.reject(error);
            }
            
            config.retryCount += 1;
            return new Promise(resolve => {
                setTimeout(() => resolve(API(config)), config.retryDelay || 1000);
            });
        }
        
        return Promise.reject(error);
    }
);

export const login = (authdata) => API.post("user/login", authdata);
export const signup = (authdata) => API.post("user/signup", authdata);
export const verifyOtp = (verificationData) => API.post("user/verify-otp", verificationData);
export const getallusers = () => API.get("/user/getallusers");
export const updateprofile = (id, updatedata) => API.patch(`user/update/${id}`, updatedata);

// Friend-related API calls
export const getFriendsList = () => API.get('/user/friends/list');
export const getFriendRequests = () => API.get('/user/friends/requests');
export const sendFriendRequest = (userId) => API.post('/user/friends/request', { receiverId: userId });
export const acceptFriendRequest = (requestId) => API.put(`/user/friends/request/${requestId}/accept`);
export const removeFriend = (friendId) => API.delete(`/user/friends/${friendId}`);

export const postquestion = (questiondata) => API.post("/questions/Ask", questiondata);
export const getallquestions = () => API.get("/questions/get");
export const deletequestion = (id) => API.delete(`/questions/delete/${id}`);
export const votequestion = (id, value) => API.patch(`/questions/vote/${id}`, { value });


export const postanswer = (id, noofanswers, answerbody, useranswered, userid) => API.patch(`/answer/post/${id}`, { noofanswers, answerbody, useranswered, userid });
export const deleteanswer = (id, answerid, noofanswers) => API.patch(`/answer/delete/${id}`, { answerid, noofanswers });

// Posts API calls
export const createPost = (postData) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    return API.post('/posts/create', postData, config);
};

export const getFeedPosts = () => API.get('/posts/feed');
export const likePost = (postId) => API.post(`/posts/${postId}/like`);
export const commentPost = (postId, commentData) => API.post(`/posts/${postId}/comment`, commentData);

// OTP Verification APIs
export const sendEmailVerification = (email, language) => 
    API.post('/language/verify-email', { email, language });

export const sendSMSVerification = (phone, language) => 
    API.post('/language/verify-phone', { phone, language });

export const verifyOTPCode = (code, verificationId, language) => 
    API.post('/language/verify-code', { code, verificationId, language });
