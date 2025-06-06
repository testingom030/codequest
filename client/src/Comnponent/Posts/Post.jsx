import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar/Avatar';
import { useLanguage } from '../../utils/LanguageContext';
import moment from 'moment';
import './Post.css';

const Post = ({ post, onUpdate }) => {
  const [comment, setComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { translate } = useLanguage();
  const user = useSelector(state => state.currentuserreducer);

  const handleLike = async () => {
    try {
      const token = user?.result?.token || JSON.parse(localStorage.getItem('Profile'))?.token;
      if (!token) {
        throw new Error('Please log in to like posts');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/posts/${post._id}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to like post');
      }

      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setIsSubmitting(true);
      const token = user?.result?.token || JSON.parse(localStorage.getItem('Profile'))?.token;
      if (!token) {
        throw new Error('Please log in to comment');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/posts/${post._id}/comment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: comment })
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      setComment('');
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error commenting:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-user">
          <Avatar 
            backgroundColor="purple" 
            px="5px" 
            py="3px"
            borderRadius="50%"
            color="white"
          >
            {post.user.name.charAt(0).toUpperCase()}
          </Avatar>
          <div className="user-info">
            <h4>{post.user.name}</h4>
            <small>{moment(post.createdAt).fromNow()}</small>
          </div>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.image && (
          <div className="post-media">
            <img src={`${process.env.REACT_APP_API_URL || ''}/${post.image}`} alt="Post" />
          </div>
        )}
        {post.video && (
          <div className="post-media">
            <video src={`${process.env.REACT_APP_API_URL || ''}/${post.video}`} controls />
          </div>
        )}
      </div>

      <div className="post-actions">
        <button 
          className={`action-btn ${post.likes.includes(user?.result?._id) ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <i className="fas fa-heart"></i>
          <span>{post.likes.length} {translate('Likes')}</span>
        </button>
        <button className="action-btn" onClick={() => setIsExpanded(!isExpanded)}>
          <i className="fas fa-comment"></i>
          <span>{post.comments.length} {translate('Comments')}</span>
        </button>
      </div>

      {isExpanded && (
        <div className="comments-section">
          <form onSubmit={handleComment} className="comment-form">
            <input
              type="text"
              placeholder={translate('Write a comment...')}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isSubmitting}
            />
            <button type="submit" disabled={!comment.trim() || isSubmitting}>
              {isSubmitting ? translate('Posting...') : translate('Post')}
            </button>
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
