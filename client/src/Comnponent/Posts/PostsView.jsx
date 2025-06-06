import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '../../utils/LanguageContext';
import CreatePost from '../Posts/CreatePost';
import Post from '../Posts/Post';
import './PostsView.css';

const PostsView = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const currentUser = useSelector(state => state.currentuserreducer);
  const { translate } = useLanguage();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/posts', {
        headers: {
          'Authorization': `Bearer ${currentUser?.token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      dispatch({ type: 'FETCH_POSTS', payload: data });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="posts-loading">
        {translate('Loading posts...')}
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts-error">
        {translate('Error loading posts:')} {error}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="no-posts">
        <p>{translate('No posts yet. Be the first to share something!')}</p>
      </div>
    );
  }

  return (
    <div className="posts-view">
      <CreatePost onPostCreated={fetchPosts} />
      
      <div className="posts-list">
        {posts.map(post => (
          <Post 
            key={post._id} 
            post={post}
            onUpdate={fetchPosts}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsView;
