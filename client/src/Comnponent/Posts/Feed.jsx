import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Feed.css';
import CreatePost from './CreatePost';
import Post from './Post';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector(state => state.currentuserreducer);
  const friendCount = currentUser?.result?.friends?.length || 0;

  // Calculate daily post limit based on friend count
  const getDailyPostLimit = () => {
    if (friendCount === 0) return 0;
    if (friendCount < 2) return 1;
    if (friendCount < 10) return 2;
    return Infinity;
  };

  const handlePostCreate = async (postData) => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      // Append post data
      formData.append('content', postData.content);
      if (postData.image) {
        formData.append('image', postData.image);
      }
      if (postData.video) {
        formData.append('video', postData.video);
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const newPost = await response.json();
      setPosts([newPost, ...posts]);
    } catch (error) {
      console.error('Error creating post:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feed-container">
      {getDailyPostLimit() > 0 ? (
        <CreatePost 
          onPostCreate={handlePostCreate} 
          dailyPostLimit={getDailyPostLimit()}
          isLoading={loading}
        />
      ) : (
        <div className="no-friends-message">
          <h3>Add friends to start posting</h3>
          <p>You need at least one friend to start posting in the feed.</p>
        </div>
      )}

      <div className="posts-list">
        {posts.map(post => (
          <Post 
            key={post._id} 
            post={post}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
