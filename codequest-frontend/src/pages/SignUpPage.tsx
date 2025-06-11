import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import CaptchaSymbols from '../components/CaptchaSymbols';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

const SignUpPage = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedSymbols, setSelectedSymbols] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    displayName?: string;
    email?: string;
    password?: string;
    captcha?: string;
    general?: string;
  }>({});
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      // Validate all fields
      const newErrors: typeof errors = {};
      
      if (displayName.length < 3) {
        newErrors.displayName = 'Display name must be at least 3 characters';
      }

      if (!email || !EMAIL_REGEX.test(email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!password || !PASSWORD_REGEX.test(password)) {
        newErrors.password = 'Password must be at least 8 characters and include both letters and numbers';
      }

      if (selectedSymbols.length === 0) {
        newErrors.captcha = 'Please complete the security check';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }

      // This would normally make an API call
      console.log({ displayName, email, password, selectedSymbols });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/login?signup=success');
    } catch (error) {
      setErrors({
        general: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-50px)] bg-[#f1f2f3] flex items-center justify-center py-12">
      <div className="flex flex-col items-center">
        <Link to="/" className="mb-4 -ml-2">
          <img src="/stackoverflow-logo.svg" alt="CodeQuest" className="h-[37px] w-[32px]" />
        </Link>

        <div className="w-[280px]">
          <div className="text-center mb-6">
            <h1 className="text-[27px] text-stackoverflow-black">
              Join the CodeQuest community
            </h1>
            <p className="text-[13px] text-stackoverflow-gray mt-2">
              Get unstuck — ask a question
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <Button
              variant="outlined"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => {}}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  className="fill-[#4285F4]"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  className="fill-[#34A853]"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  className="fill-[#FBBC05]"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  className="fill-[#EA4335]"
                />
              </svg>
              Sign up with Google
            </Button>
            <Button
              variant="outlined"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => {}}
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 16 16">
                <path
                  fill="#24292f"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
              Sign up with GitHub
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md mb-6">
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[3px] text-[13px] text-stackoverflow-red">
                {errors.general}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="displayName" className="block text-[15px] font-medium text-stackoverflow-black mb-1">
                Display name
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={`w-full border rounded-[3px] px-3 py-2 text-[13px] focus:outline-none focus:ring-2 ${
                  errors.displayName
                    ? 'border-stackoverflow-red focus:border-stackoverflow-red focus:ring-stackoverflow-red/20'
                    : 'border-[#BABFC4] focus:border-stackoverflow-blue focus:ring-stackoverflow-blue/20'
                }`}
                disabled={isLoading}
                required
              />
              {errors.displayName && <p className="mt-1 text-[12px] text-stackoverflow-red">{errors.displayName}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-[15px] font-medium text-stackoverflow-black mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border rounded-[3px] px-3 py-2 text-[13px] focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-stackoverflow-red focus:border-stackoverflow-red focus:ring-stackoverflow-red/20'
                    : 'border-[#BABFC4] focus:border-stackoverflow-blue focus:ring-stackoverflow-blue/20'
                }`}
                disabled={isLoading}
                required
              />
              {errors.email && <p className="mt-1 text-[12px] text-stackoverflow-red">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-[15px] font-medium text-stackoverflow-black mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border rounded-[3px] px-3 py-2 text-[13px] focus:outline-none focus:ring-2 ${
                  errors.password
                    ? 'border-stackoverflow-red focus:border-stackoverflow-red focus:ring-stackoverflow-red/20'
                    : 'border-[#BABFC4] focus:border-stackoverflow-blue focus:ring-stackoverflow-blue/20'
                }`}
                disabled={isLoading}
                required
              />
              {errors.password && <p className="mt-1 text-[12px] text-stackoverflow-red">{errors.password}</p>}
              <p className="mt-1 text-[12px] text-stackoverflow-gray">
                Passwords must be at least 8 characters and contain both letters and numbers.
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-[15px] font-medium text-stackoverflow-black mb-2">
                Security Check
              </label>
              <CaptchaSymbols onSelectionChange={setSelectedSymbols} />
              {errors.captcha && <p className="mt-2 text-[12px] text-stackoverflow-red">{errors.captcha}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign up'}
            </Button>

            <p className="mt-4 text-[12px] text-stackoverflow-gray">
              By clicking "Sign up", you agree to our{' '}
              <Link to="/terms" className="text-stackoverflow-blue hover:text-[#0a95ff]">
                terms of service
              </Link>
              ,{' '}
              <Link to="/privacy" className="text-stackoverflow-blue hover:text-[#0a95ff]">
                privacy policy
              </Link>{' '}
              and{' '}
              <Link to="/cookie-policy" className="text-stackoverflow-blue hover:text-[#0a95ff]">
                cookie policy
              </Link>
            </p>
          </form>

          <p className="text-[13px] text-stackoverflow-gray text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-stackoverflow-blue hover:text-[#0a95ff]">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
