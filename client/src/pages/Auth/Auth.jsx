import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import icon from '../../assets/icon.png';
import Aboutauth from './Aboutauth';
import { signup, login, verifyOtp } from '../../action/auth';

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showOtpVerification, setShowOtpVerification] = useState(false);
    const [emailOtp, setEmailOtp] = useState('');
    const [mobileOtp, setMobileOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!email || !password) {
            setError('Email and password are required');
            setIsLoading(false);
            return;
        }

        if (isSignup) {
            if (!name) {
                setError('Name is required for signup');
                setIsLoading(false);
                return;
            }
            if (!mobileNumber) {
                setError('Mobile number is required for signup');
                setIsLoading(false);
                return;
            }

            // First step of signup - send OTPs
            const result = await dispatch(signup({ 
                name, 
                email, 
                password, 
                mobileNumber 
            }));

            if (result.success) {
                setShowOtpVerification(true);
            } else {
                setError(result.error);
            }
        } else {
            // Regular login
            const result = await dispatch(login({ email, password }, navigate));
            if (!result.success) {
                setError(result.error);
            }
        }
        setIsLoading(false);
    };

    const handleOtpVerification = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!emailOtp || !mobileOtp) {
            setError('Both Email OTP and Mobile OTP are required');
            setIsLoading(false);
            return;
        }

        const result = await dispatch(verifyOtp({
            email,
            mobileNumber,
            emailOtp,
            mobileOtp
        }));

        if (result.success) {
            navigate('/'); // Redirect to home after successful verification
        } else {
            setError(result.error);
        }
        setIsLoading(false);
    };

    const handleSwitch = () => {
        setIsSignup(!isSignup);
        setName('');
        setEmail('');
        setMobileNumber('');
        setPassword('');
        setEmailOtp('');
        setMobileOtp('');
        setError('');
        setShowOtpVerification(false);
    };

    if (showOtpVerification) {
        return (
            <section className='auth-section'>
                <div className='auth-container'>
                    <h2>Verify Your Account</h2>
                    <form onSubmit={handleOtpVerification}>
                        <label htmlFor="emailOtp">
                            <h4>Email OTP</h4>
                            <input
                                type="text"
                                id="emailOtp"
                                name="emailOtp"
                                value={emailOtp}
                                onChange={(e) => setEmailOtp(e.target.value)}
                                placeholder="Enter OTP sent to your email"
                            />
                        </label>
                        <label htmlFor="mobileOtp">
                            <h4>Mobile OTP</h4>
                            <input
                                type="text"
                                id="mobileOtp"
                                name="mobileOtp"
                                value={mobileOtp}
                                onChange={(e) => setMobileOtp(e.target.value)}
                                placeholder="Enter OTP sent to your mobile"
                            />
                        </label>
                        {error && <p className='error-message'>{error}</p>}
                        <button type='submit' className='auth-btn' disabled={isLoading}>
                            {isLoading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </form>
                </div>
            </section>
        );
    }

    return (
        <section className='auth-section'>
            {isSignup && <Aboutauth />}
            <div className='auth-container'>
                <img src={icon} alt='Code Quest' className='login-logo' />
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <label htmlFor="name">
                            <h4>Display Name</h4>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                    )}
                    <label htmlFor="email">
                        <h4>Email</h4>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    {isSignup && (
                        <label htmlFor="mobile">
                            <h4>Mobile Number</h4>
                            <input
                                type="tel"
                                id="mobile"
                                name="mobile"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                placeholder="Enter your mobile number"
                            />
                        </label>
                    )}
                    <label htmlFor="password">
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <h4>Password</h4>
                            {!isSignup && <p style={{color: "#007ac6", fontSize:'13px'}}>Forgot password?</p>}
                        </div>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {error && <p className='error-message'>{error}</p>}
                    <button type='submit' className='auth-btn' disabled={isLoading}>
                        {isLoading ? 'Loading...' : isSignup ? 'Sign up' : 'Log in'}
                    </button>
                </form>
            </div>
            <p>
                {isSignup ? 'Already have an account?' : "Don't have an account?"}
                <button type='button' className='handle-switch-btn' onClick={handleSwitch}>
                    {isSignup ? 'Log in' : 'Sign up'}
                </button>
            </p>
        </section>
    );
};

export default Auth;