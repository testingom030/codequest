import axios from "axios";

const API=axios.create({
    baseURL: process.env.REACT_APP_API_URL || "https://code-quest-flame.vercel.app",
    headers: {
        'Content-Type': 'application/json'
    }
});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("Profile")){
        req.headers.Authorization=`Bearer ${
            JSON.parse(localStorage.getItem("Profile")).token
        }`;
    }
    return req;
})

export const login=(authdata)=>API.post("user/login",authdata);
export const signup=(authdata)=>API.post("user/signup",authdata);
export const getallusers=()=> API.get("/user/getallusers");
export const updateprofile=(id,updatedata)=>API.patch(`user/update/${id}`,updatedata);

// Friend-related API calls
export const getFriendsList = () => API.get('/user/friends/list');
export const getFriendRequests = () => API.get('/user/friends/requests');
export const sendFriendRequest = (userId) => API.post('/user/friends/request', { receiverId: userId });
export const acceptFriendRequest = (requestId) => API.put(`/user/friends/request/${requestId}/accept`);
export const removeFriend = (friendId) => API.delete(`/user/friends/${friendId}`);

export const postquestion=(questiondata)=>API.post("/questions/Ask",questiondata);
export const getallquestions=()=>API.get("/questions/get");
export const deletequestion=(id)=>API.delete(`/questions/delete/${id}`);
export const votequestion=(id,value)=>API.patch(`/questions/vote/${id}`,{value});


export const postanswer=(id,noofanswers,answerbody,useranswered,userid)=>API.patch(`/answer/post/${id}`,{noofanswers,answerbody,useranswered,userid});
export const deleteanswer=(id,answerid,noofanswers)=>API.patch(`/answer/delete/${id}`,{answerid,noofanswers});

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
