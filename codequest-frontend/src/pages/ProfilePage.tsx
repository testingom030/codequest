import React, { useState } from 'react';
import AvatarUpload from '../components/AvatarUpload';
import Button from '../components/Button';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'hi', name: 'Hindi' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'fr', name: 'French' },
];

interface ProfileData {
  username: string;
  email: string;
  avatar: string;
  preferredLanguage: string;
  phoneNumber?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  friendCount: number;
}

const ProfilePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [verificationStep, setVerificationStep] = useState<'email' | 'phone' | null>(null);
  const [otp, setOtp] = useState('');
  
  // This would normally come from your auth context or API
  const [profile, setProfile] = useState<ProfileData>({
    username: 'JohnDoe',
    email: 'john@example.com',
    avatar: '/default-avatar.svg',
    preferredLanguage: 'en',
    emailVerified: false,
    phoneVerified: false,
    friendCount: 0
  });

  const handleAvatarChange = async (file: File) => {
    try {
      setError('');
      setIsLoading(true);
      
      // This would normally upload to your server
      const formData = new FormData();
      formData.append('avatar', file);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update profile with new avatar URL
      setProfile(prev => ({
        ...prev,
        avatar: URL.createObjectURL(file)
      }));
    } catch (err) {
      setError('Failed to update profile picture');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = async (language: string) => {
    try {
      setError('');
      setIsLoading(true);

      // If changing to French, require email verification
      if (language === 'fr' && !profile.emailVerified) {
        setVerificationStep('email');
        return;
      }
      
      // For other languages, require phone verification
      if (!profile.phoneVerified) {
        setVerificationStep('phone');
        return;
      }

      // This would normally be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setProfile(prev => ({
        ...prev,
        preferredLanguage: language
      }));
    } catch (err) {
      setError('Failed to update language preference');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setIsLoading(true);

      // This would normally verify with your API
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (verificationStep === 'email') {
        setProfile(prev => ({ ...prev, emailVerified: true }));
      } else {
        setProfile(prev => ({ ...prev, phoneVerified: true }));
      }

      setVerificationStep(null);
    } catch (err) {
      setError('Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-[27px] text-stackoverflow-black mb-8">Your Profile</h1>

      <div className="bg-white border border-[#E3E6E8] rounded-[3px] p-6 space-y-8">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-[3px] text-[13px] text-stackoverflow-red">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-[19px] text-stackoverflow-black">Profile Picture</h2>
          <AvatarUpload
            currentAvatar={profile.avatar}
            onAvatarChange={handleAvatarChange}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-[19px] text-stackoverflow-black">Language Preference</h2>
          <div className="grid grid-cols-2 gap-4">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                disabled={isLoading}
                className={`px-4 py-2 rounded-md border text-[13px] ${
                  profile.preferredLanguage === lang.code
                    ? 'bg-stackoverflow-blue text-white border-stackoverflow-blue'
                    : 'border-[#BABFC4] hover:bg-gray-50'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {verificationStep && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-[320px]">
              <h3 className="text-[15px] font-medium text-stackoverflow-black mb-4">
                {verificationStep === 'email' 
                  ? 'Verify your email'
                  : 'Verify your phone number'
                }
              </h3>

              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="block text-[13px] text-stackoverflow-gray mb-1">
                    Enter verification code:
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border rounded-[3px] px-3 py-2 text-[13px]"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Verifying...' : 'Verify'}
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => setVerificationStep(null)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
