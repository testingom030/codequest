import {combineReducers} from "redux"
import authreducer from "./auth"
import currentuserreducer from "./currentuser";
import usersreducer from "./users";
import questionreducer from "./question";
import friendsReducer from "./friends";
import postsReducer from "./posts";

export default combineReducers({
    authreducer,
    currentuserreducer,
    usersreducer,
    questionreducer,
    friends: friendsReducer,
    posts: postsReducer,
});