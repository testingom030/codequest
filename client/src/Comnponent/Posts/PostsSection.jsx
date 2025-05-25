import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLanguage } from '../../utils/LanguageContext';
import CreatePost from './CreatePost';
import Post from './Post';
import './PostsSection.css';

const PostsSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { translate } = useLanguage();
  const currentUser = useSelector(state => state.currentuserreducer);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts', {
        headers: {
          'Authorization': `Bearer ${currentUser?.token}`
        }
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="posts-section">
        <div className="no-auth-message">
          <h3>{translate('Please log in to view and create posts')}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-section">
      <div className="posts-header">
        <h2>{translate('Community Posts')}</h2>
      </div>

      <CreatePost onPostCreated={fetchPosts} />

      <div className="posts-list">
        {loading ? (
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
            <p>{translate('Loading posts...')}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="no-posts-message">
            <h3>{translate('No posts yet')}</h3>
            <p>{translate('Be the first one to share something!')}</p>
          </div>
        ) : (
          posts.map(post => (
            <Post key={post._id} post={post} onUpdate={fetchPosts} />
          ))
        )}
      </div>
    </div>
  );
};

export default PostsSection;
