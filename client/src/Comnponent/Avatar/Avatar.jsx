import React from 'react';
import './Avatar.css';

const Avatar = ({ user, size = '40', backgroundColor, color = 'white', fontSize, withBorder = false }) => {
  if (!user) {
    return null;
  }

  const style = {
    backgroundColor: backgroundColor || '#1877f2',
    color,
    width: `${size}px`,
    height: `${size}px`,
    fontSize: fontSize || `${parseInt(size) * 0.4}px`,
  };

  const avatarClass = `avatar${withBorder ? ' with-border' : ''}`;

  return (
    <div className={avatarClass} style={style}>
      {user.avatar ? (
        <img 
          src={user.avatar} 
          alt={user.name} 
          onError={(e) => {
            e.target.onerror = null;
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.textContent = user.name.charAt(0).toUpperCase();
          }}
        />
      ) : (
        user.name.charAt(0).toUpperCase()
      )}
    </div>
  );
};

export default Avatar;