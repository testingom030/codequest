import * as api from '../api';

export const getFriends = () => async (dispatch) => {
  try {
    const { data } = await api.getFriendsList();
    dispatch({ type: 'FETCH_FRIENDS', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getFriendRequests = () => async (dispatch) => {
  try {
    const { data } = await api.getFriendRequests();
    dispatch({ type: 'FETCH_FRIEND_REQUESTS', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const sendFriendRequest = (userId) => async (dispatch) => {
  try {
    const { data } = await api.sendFriendRequest(userId);
    dispatch({ type: 'SEND_FRIEND_REQUEST', payload: data });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.response?.data?.message };
  }
};

export const acceptFriendRequest = (requestId) => async (dispatch) => {
  try {
    const { data } = await api.acceptFriendRequest(requestId);
    dispatch({ type: 'ACCEPT_FRIEND_REQUEST', payload: data });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.response?.data?.message };
  }
};

export const removeFriend = (friendId) => async (dispatch) => {
  try {
    await api.removeFriend(friendId);
    dispatch({ type: 'REMOVE_FRIEND', payload: friendId });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.response?.data?.message };
  }
};
