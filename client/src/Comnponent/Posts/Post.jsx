import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLanguage } from '../../utils/LanguageContext';
import Avatar from '../Avatar/Avatar';
import moment from 'moment';
import './Post.css';

const Post = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch({ type: 'LIKE_POST', payload: post._id });
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      dispatch({ type: 'ADD_COMMENT', payload: { postId: post._id, comment } });
      setComment('');
    }
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="post-user-info">
          <Avatar 
            backgroundColor="purple" 
            px="8px" 
            py="5px"
            borderRadius="50%"
            color="white"
          >
            {post.user.name.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <h4>{post.user.name}</h4>
            <p>{moment(post.createdAt).fromNow()}</p>
          </div>
        </div>
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
        {post.image && (
          <img src={post.image} alt="Post" className="post-image" />
        )}
        {post.video && (
          <video controls className="post-video">
            <source src={post.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <div className="post-actions">
        <button onClick={handleLike} className="action-btn">
          <i className="fas fa-heart"></i>
          <span>{post.likes.length} Likes</span>
        </button>
        <button onClick={() => setIsExpanded(!isExpanded)} className="action-btn">
          <i className="fas fa-comment"></i>
          <span>{post.comments.length} Comments</span>
        </button>
        <button className="action-btn">
          <i className="fas fa-share"></i>
          <span>Share</span>
        </button>
      </div>

      {isExpanded && (
        <div className="comments-section">
          <form onSubmit={handleComment} className="comment-form">
            <input
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>
          
          <div className="comments-list">
            {post.comments.map((comment, index) => (
              <div key={index} className="comment">
                <Avatar 
                  backgroundColor="purple" 
                  px="5px" 
                  py="3px"
                  borderRadius="50%"
                  color="white"
                  fontSize="12px"
                >
                  {comment.user.name.charAt(0).toUpperCase()}
                </Avatar>
                <div className="comment-content">
                  <h5>{comment.user.name}</h5>
                  <p>{comment.text}</p>
                  <small>{moment(comment.createdAt).fromNow()}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
