const postsReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POSTS':
      return action.payload;
    
    case 'CREATE_POST':
      return [action.payload, ...state];
    
    case 'UPDATE_POST':
      return state.map(post => 
        post._id === action.payload._id ? action.payload : post
      );
    
    case 'DELETE_POST':
      return state.filter(post => post._id !== action.payload);
    
    case 'LIKE_POST':
      return state.map(post =>
        post._id === action.payload._id ? action.payload : post
      );
    
    case 'ADD_COMMENT':
      return state.map(post =>
        post._id === action.payload.postId
          ? { ...post, comments: action.payload.comments }
          : post
      );
      
    default:
      return state;
  }
};

export default postsReducer;
