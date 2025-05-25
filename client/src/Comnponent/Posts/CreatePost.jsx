import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CreatePost.css';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.currentuserreducer);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !media) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('content', content);
    if (media) {
      formData.append('media', media);
    }

    try {
      await dispatch({ type: 'CREATE_POST', payload: formData });
      setContent('');
      setMedia(null);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post">
      <h3>Create Post</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        
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
        </div>

        <button 
          type="submit" 
          className="post-btn" 
          disabled={isSubmitting || (!content.trim() && !media)}
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
