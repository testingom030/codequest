import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateprofile } from '../../action/users'
import './Userprofile.css'

const Edirprofileform = ({ currentuser, setswitch }) => {
  const [name, setname] = useState(currentuser?.result?.name)
  const [about, setabout] = useState(currentuser?.result?.about)
  const [tags, settags] = useState([])
  const [avatar, setAvatar] = useState(null)
  const dispatch = useDispatch()

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    if (tags[0] === '' || tags.length === 0) {
      alert("update tags field")
      return
    }

    if (avatar) {
      const formData = new FormData();
      formData.append('avatar', avatar);
      
      try {
        const response = await fetch('/avatar/update', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
          },
          body: formData
        });
        
        const data = await response.json();
        if (data.avatar) {
          dispatch(updateprofile(currentuser?.result?._id, { name, about, tags, avatar: data.avatar }));
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
      }
    } else {
      dispatch(updateprofile(currentuser?.result?._id, { name, about, tags }));
    }
    setswitch(false);
  }

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className='edit-profile-title-2'>Public Information</h2>
      <form className="edit-profile-form" onSubmit={handlesubmit}>
        <label htmlFor="avatar" className="avatar-upload">
          <h3>Profile Picture</h3>
          <div className="avatar-preview">
            <img 
              src={currentuser?.result?.avatar || 'https://www.gravatar.com/avatar/?d=identicon'} 
              alt="Current avatar"
              className="current-avatar"
            />
          </div>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="avatar-input"
          />
          <button type="button" className="upload-avatar-btn">Change Picture</button>
        </label>

        <label htmlFor="name">
          <h3>Display name</h3>
          <input type="text" value={name} onChange={(e) => setname(e.target.value)} />
        </label>
        <label htmlFor="about">
          <h3>About me</h3>
          <textarea name="" id="about" cols="30" rows="10" value={about} onChange={(e) => setabout(e.target.value)}></textarea>
        </label>
        <label htmlFor="tags">
          <h3>Watched tags</h3>
          <p>Add tags separated by 1 space</p>
          <input
            type="text"
            id="tags"
            onChange={(e) => settags(e.target.value.split(" "))}
          />
        </label>
        <br />
        <input type="submit" value="save profile" className='user-submit-btn' />
        <button type='button' className='user-cancel-btn' onClick={() => setswitch(false)}>Cancel</button>
      </form>
    </div>
  )
}

export default Edirprofileform