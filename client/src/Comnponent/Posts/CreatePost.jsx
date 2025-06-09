import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '../../utils/LanguageContext';
import { createPost } from '../../api';
import './CreatePost.css';

const CreatePost = ({ onPostCreated }) => {
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
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError(translate('File size must be less than 5MB'));
        return;
      }
      // Validate file type
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        setError(translate('Only images and videos are allowed'));
        return;
      }
      setMedia(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !media) {
      setError(translate('Please add some content or media to your post'));
      return;
    }

    if (!user?.result) {
      setError(translate('Please log in to create a post'));
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('content', content);
      
      if (media) {
        formData.append('media', media);
      }

      const { data } = await createPost(formData);
      
      dispatch({ type: 'CREATE_POST', payload: data });
      if (onPostCreated) {
        onPostCreated(data);
      }
      setContent('');
      setMedia(null);
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error?.response?.data?.message || error.message || translate('Failed to create post'));
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
          required={!media}
          className={error ? 'error' : ''}
        />
        
        {error && <p className="error-message">{error}</p>}
        
        <div className="media-upload">
          <label htmlFor="media-input" className="media-label">
            <i className="fas fa-image"></i>
            <span>{translate('Add Photo/Video')}</span>
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
                aria-label={translate('Remove media')}
              >
                ×
              </button>
            </div>
          )}
        </div>
        <button 
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
