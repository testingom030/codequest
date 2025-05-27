import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './FriendsList.css';
import Avatar from '../Avatar/Avatar';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector(state => state.currentuserreducer);

  useEffect(() => {
    fetchFriends();
    fetchRequests();
  }, []);

  const fetchFriends = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/friends/list', {
        headers: {
          'Authorization': `Bearer ${currentUser.token}`
        }
      });
      const data = await response.json();
      setFriends(data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/friends/requests', {
        headers: {
          'Authorization': `Bearer ${currentUser.token}`
        }
      });
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await fetch(`/api/friends/request/${requestId}/accept`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`
        }
      });
      fetchFriends();
      fetchRequests();
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      await fetch(`/api/friends/${friendId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`
        }
      });
      fetchFriends();
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  return (
    <div className="friends-container">
      {requests.length > 0 && (
        <div className="friend-requests">
          <h3>Friend Requests</h3>
          <div className="requests-list">
            {requests.map(request => (
              <div key={request._id} className="request-item">
                <div className="user-info">
                  <Avatar 
                    backgroundColor="purple"
                    px="8px"
                    py="5px"
                    borderRadius="50%"
                    color="white"
                  >
                    {request.sender.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <span>{request.sender.name}</span>
                </div>
                <button 
                  onClick={() => handleAcceptRequest(request._id)}
                  className="accept-btn"
                >
                  Accept
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="friends-list">
        <h3>Friends ({friends.length})</h3>
        {loading ? (
          <div className="loading">Loading friends...</div>
        ) : (
          <div className="friends-grid">
            {friends.map(friend => (
              <div key={friend._id} className="friend-card">
                <Avatar 
                  backgroundColor="purple"
                  px="15px"
                  py="10px"
                  borderRadius="50%"
                  color="white"
                >
                  {friend.name.charAt(0).toUpperCase()}
                </Avatar>
                <h4>{friend.name}</h4>
                <button 
                  onClick={() => handleRemoveFriend(friend._id)}
                  className="remove-btn"
                >
                  Remove Friend
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsList;
