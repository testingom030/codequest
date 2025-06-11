import React, { useState, useRef } from 'react';
import Button from './Button';

interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange: (file: File) => Promise<void>;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ currentAvatar = '/default-avatar.svg', onAvatarChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string>(currentAvatar);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      setError('');
      setIsUploading(true);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload file
      await onAvatarChange(file);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      setPreviewUrl(currentAvatar);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 hover:border-stackoverflow-blue cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={previewUrl} 
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />

      <Button
        variant="outlined"
        className="text-sm"
        onClick={() => fileInputRef.current?.click()}
      >
        Change Profile Picture
      </Button>

      {error && (
        <p className="text-[12px] text-stackoverflow-red mt-1">{error}</p>
      )}

      <p className="text-[12px] text-stackoverflow-gray mt-1">
        Click to upload a profile picture (max 5MB)
      </p>
    </div>
  );
};

export default AvatarUpload;
