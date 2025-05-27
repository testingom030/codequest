import React from 'react';
import { useLanguage } from '../../utils/LanguageContext';
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar';
import FriendsList from '../../Comnponent/Friends/FriendsList';
import './Friends.css';

const Friends = ({ slidein }) => {
  const { translate } = useLanguage();

  return (
    <div className="home-container-1">
      <Leftsidebar slidein={slidein} />
      <div className="home-container-2">
        <h1 className="friends-title">{translate('Friends')}</h1>
        <FriendsList />
      </div>
    </div>
  );
};

export default Friends;
