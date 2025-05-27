import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CreatePost from '../../Comnponent/Posts/CreatePost';
import PostsView from '../../Comnponent/Posts/PostsView';
import FriendSearch from '../../Comnponent/Friends/FriendSearch';
import './Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.currentuserreducer);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/posts/feed', {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
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

  const handlePostCreated = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <div className="feed-container">
      <div className="feed-main">
        <div className="feed-left">
          <CreatePost onPostCreated={handlePostCreated} />
          {loading ? (
            <div className="loading">Loading posts...</div>
          ) : (
            <PostsView posts={posts} />
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
