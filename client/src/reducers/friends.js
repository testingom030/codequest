const friendsReducer = (state = { friends: [], requests: [] }, action) => {
  switch (action.type) {
    case 'FETCH_FRIENDS':
      return { ...state, friends: action.payload };
    
    case 'FETCH_FRIEND_REQUESTS':
      return { ...state, requests: action.payload };
    
    case 'SEND_FRIEND_REQUEST':
      return { 
        ...state, 
        requests: [...state.requests, action.payload] 
      };
    
    case 'ACCEPT_FRIEND_REQUEST':
      return {
        ...state,
        friends: [...state.friends, action.payload.friend],
        requests: state.requests.filter(req => req._id !== action.payload.requestId)
      };
    
    case 'REMOVE_FRIEND':
      return {
        ...state,
        friends: state.friends.filter(friend => friend._id !== action.payload)
      };
    
    default:
      return state;
  }
};

export default friendsReducer;
