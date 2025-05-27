import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './FriendSearch.css';

const FriendSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length >= 2) {
      try {
        const response = await fetch(`/user/search?term=${encodeURIComponent(term)}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSendRequest = async (userId) => {
    try {
      const response = await fetch('/user/friend-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
        },
        body: JSON.stringify({ receiverId: userId })
      });
      const data = await response.json();
      if (data.success) {
        // Update the search results to show "Request Sent"
        setSearchResults(prevResults =>
          prevResults.map(user =>
            user._id === userId ? { ...user, requestSent: true } : user
          )
        );
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <div className="friend-search">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search users to add as friends..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map(user => (
            <div key={user._id} className="user-card">
              <img 
                src={user.avatar || 'https://www.gravatar.com/avatar/?d=identicon'} 
                alt={user.name} 
                className="user-avatar"
              />
              <div className="user-info">
                <h4>{user.name}</h4>
                <p>{user.about || 'No bio available'}</p>
              </div>
              <button
                className={`add-friend-btn ${user.requestSent ? 'sent' : ''}`}
                onClick={() => handleSendRequest(user._id)}
                disabled={user.requestSent}
              >
                {user.requestSent ? 'Request Sent' : 'Add Friend'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendSearch;
