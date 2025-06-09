import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar/Avatar';
import { useLanguage } from '../../utils/LanguageContext';
import { likePost, commentPost } from '../../api';
import moment from 'moment';
import './Post.css';

const Post = ({ post, onUpdate }) => {
  const [comment, setComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { translate } = useLanguage();
  const user = useSelector(state => state.currentuserreducer);

  const handleLike = async () => {
    try {
      if (!user?.result) {
        setError('Please log in to like posts');
        return;
      }

      await likePost(post._id);
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error liking post:', error);
      setError(error?.response?.data?.message || 'Failed to like post');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    if (!user?.result) {
      setError('Please log in to comment');
      return;
    }

    try {
      setIsSubmitting(true);
      await commentPost(post._id, { text: comment });
      setComment('');
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error commenting:', error);
      setError(error?.response?.data?.message || 'Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMediaUrl = (path) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `${process.env.REACT_APP_API_URL}/${path}`;
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
            <img src={getMediaUrl(post.image)} alt="Post content" loading="lazy" />
          </div>
        )}
        {post.video && (
          <div className="post-media">
            <video src={getMediaUrl(post.video)} controls />
          </div>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}

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
