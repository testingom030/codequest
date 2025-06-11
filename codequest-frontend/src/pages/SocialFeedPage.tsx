import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Button from '../components/Button';

interface Post {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
    avatar: string;
  };
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  likes: string[];
  comments: Array<{
    id: string;
    content: string;
    author: {
      id: string;
      username: string;
      avatar: string;
    };
  }>;
  shares: string[];
  createdAt: string;
}

interface User {
  id: string;
  username: string;
  avatar: string;
  friends: string[];
  postsToday: number;
  lastPostDate?: string;
}

const SocialFeedPage: React.FC = () => {
  const { translate } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // This would come from your auth context
  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    username: 'JohnDoe',
    avatar: '/default-avatar.svg',
    friends: [],
    postsToday: 0
  });

  const canUserPost = () => {
    const friendCount = currentUser.friends.length;
    if (friendCount === 0) return false;

    const now = new Date();
    const lastPost = currentUser.lastPostDate ? new Date(currentUser.lastPostDate) : null;
    
    // Reset posts count if it's a new day
    if (!lastPost || lastPost.getDate() !== now.getDate()) {
      return true;
    }

    // Determine max posts based on friend count
    let maxPosts = 1;
    if (friendCount >= 2 && friendCount < 10) {
      maxPosts = 2;
    } else if (friendCount >= 10) {
      maxPosts = Infinity;
    }

    return currentUser.postsToday < maxPosts;
  };

  const getPostingStatus = () => {
    const friendCount = currentUser.friends.length;
    if (friendCount === 0) {
      return translate('social.post.needFriends');
    }
    if (!canUserPost()) {
      if (friendCount < 2) {
        return translate('social.post.limitReached');
      } else if (friendCount < 10) {
        return translate('social.post.twoPostsLimit');
      }
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canUserPost()) {
      setError(getPostingStatus());
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      // This would be an API call in production
      const formData = new FormData();
      formData.append('content', newPost);
      if (mediaFile) {
        formData.append('media', mediaFile);
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newPostObj: Post = {
        id: Date.now().toString(),
        content: newPost,
        author: {
          id: currentUser.id,
          username: currentUser.username,
          avatar: currentUser.avatar
        },
        likes: [],
        comments: [],
        shares: [],
        createdAt: new Date().toISOString()
      };

      setPosts(prev => [newPostObj, ...prev]);
      setNewPost('');
      setMediaFile(null);

      // Update user's post count
      setCurrentUser(prev => ({
        ...prev,
        postsToday: prev.postsToday + 1,
        lastPostDate: new Date().toISOString()
      }));
    } catch (err) {
      setError(translate('error.generic'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setError(translate('social.post.invalidMedia'));
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError(translate('social.post.fileTooLarge'));
      return;
    }

    setMediaFile(file);
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-[27px] text-stackoverflow-black mb-4">
          {translate('social.feed.title')}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white border border-[#E3E6E8] rounded-[3px] p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[3px] text-[13px] text-stackoverflow-red">
              {error}
            </div>
          )}

          <div className="mb-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder={translate('social.post.placeholder')}
              className="w-full border border-[#BABFC4] rounded-[3px] px-3 py-2 text-[13px] min-h-[100px]"
              disabled={!canUserPost() || isLoading}
            />
          </div>

          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaChange}
              className="hidden"
              id="media-upload"
              disabled={!canUserPost() || isLoading}
            />
            <label
              htmlFor="media-upload"
              className={`px-3 py-1.5 text-[13px] border rounded-[3px] cursor-pointer
                ${canUserPost() ? 'text-stackoverflow-blue border-stackoverflow-blue hover:bg-[#F0F8FF]' 
                : 'text-gray-400 border-gray-300'}`}
            >
              {translate('social.post.addMedia')}
            </label>
            {mediaFile && (
              <span className="text-[13px] text-stackoverflow-gray">
                {mediaFile.name}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-[12px] text-stackoverflow-gray">
              {getPostingStatus()}
            </p>
            <Button type="submit" disabled={!canUserPost() || isLoading || !newPost.trim()}>
              {isLoading ? translate('common.loading') : translate('social.post.submit')}
            </Button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <article key={post.id} className="bg-white border border-[#E3E6E8] rounded-[3px] p-6">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={post.author.avatar}
                alt={post.author.username}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-[15px] font-medium text-stackoverflow-black">
                  {post.author.username}
                </h3>
                <p className="text-[12px] text-stackoverflow-gray">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <p className="text-[15px] text-stackoverflow-black mb-4 whitespace-pre-wrap">
              {post.content}
            </p>

            {post.mediaUrl && (
              <div className="mb-4 rounded-md overflow-hidden">
                {post.mediaType === 'video' ? (
                  <video src={post.mediaUrl} controls className="w-full" />
                ) : (
                  <img src={post.mediaUrl} alt="" className="w-full" />
                )}
              </div>
            )}

            <div className="flex items-center gap-6 text-[13px] text-stackoverflow-gray">
              <button className="hover:text-stackoverflow-blue">
                {post.likes.length} {translate('social.post.likes')}
              </button>
              <button className="hover:text-stackoverflow-blue">
                {post.comments.length} {translate('social.post.comments')}
              </button>
              <button className="hover:text-stackoverflow-blue">
                {post.shares.length} {translate('social.post.shares')}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SocialFeedPage;
