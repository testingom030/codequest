import React from 'react';
import './Avatar.css';

const Avatar = ({ user, size = '40', backgroundColor, color = 'white', fontSize }) => {
  const style = {
    backgroundColor: backgroundColor || '#1877f2',
    color,
    width: `${size}px`,
    height: `${size}px`,
    fontSize: fontSize || `${parseInt(size) * 0.4}px`,
  };

  return (
    <div className="avatar" style={style}>
      {user?.avatar ? (
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