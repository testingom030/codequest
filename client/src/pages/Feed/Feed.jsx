import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PostsView from '../../Comnponent/Posts/PostsView';
import CreatePost from '../../Comnponent/Posts/CreatePost';
import FriendSearch from '../../Comnponent/Friends/FriendSearch';
import './Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.currentuserreducer);

  const fetchPosts = async () => {
    try {
      const token = user?.result?.token || JSON.parse(localStorage.getItem('Profile'))?.token;
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/posts/feed`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch posts');
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.result) {
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handlePostCreated = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  if (!user?.result) {
    return (
      <div className="feed-container">
        <div className="auth-required">
          <h2>Please log in to view the feed</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="feed-container">
      <div className="feed-main">
        <div className="feed-left">
          <CreatePost onPostCreated={handlePostCreated} />
          {loading ? (
            <div className="loading">Loading posts...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <PostsView posts={posts} onPostUpdate={fetchPosts} />
          )}
        </div>
        <div className="feed-right">
          <div className="friend-suggestions">
            <h3>Find Friends</h3>
            <FriendSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
