import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPosts } from '../../api';
import CreatePost from '../../Comnponent/Posts/CreatePost';
import PostsView from '../../Comnponent/Posts/PostsView';
import FriendSearch from '../../Comnponent/Friends/FriendSearch';
import './Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.currentuserreducer);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error.response?.data?.message || 'Error loading posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <div className="feed-container">
      <div className="feed-main">
        <div className="feed-left">
          {user && <CreatePost onPostCreated={handlePostCreated} />}
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
