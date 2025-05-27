import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '../../utils/LanguageContext';
import './CreatePost.css';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.currentuserreducer);
  const { translate } = useLanguage();

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !media) {
      setError(translate('Please add some content or media to your post'));
      return;
    }

    setError('');
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('content', content);
    if (media) {
      formData.append('media', media);
    }    try {
        const token = user?.result?.token || JSON.parse(localStorage.getItem('Profile'))?.token;
        if (!token) {
          throw new Error('Please log in to create a post');
        }
        
        const response = await fetch('/posts/create', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create post');
      }

      dispatch({ type: 'CREATE_POST', payload: data });
      setContent('');
      setMedia(null);
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error.message || translate('Failed to create post'));
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="create-post">
      <h3>{translate('Create Post')}</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder={translate("What's on your mind?")}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        
        {error && <p className="error-message">{error}</p>}
        
        <div className="media-upload">
          <label htmlFor="media-input" className="media-label">
            <i className="fas fa-image"></i>
            <span>Add Photo/Video</span>
          </label>
          <input
            type="file"
            id="media-input"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            style={{ display: 'none' }}
          />
          {media && (
            <div className="media-preview">
              {media.type.startsWith('image/') ? (
                <img src={URL.createObjectURL(media)} alt="Preview" />
              ) : (
                <video src={URL.createObjectURL(media)} controls />
              )}
              <button 
                type="button" 
                className="remove-media"
                onClick={() => setMedia(null)}
              >
                ×
              </button>
            </div>
          )}
        </div>          <button 
            type="submit" 
            className="post-btn" 
            disabled={isSubmitting || (!content.trim() && !media)}
          >
            {isSubmitting ? translate('Posting...') : translate('Post')}
          </button>
      </form>
    </div>
  );
};

export default CreatePost;
