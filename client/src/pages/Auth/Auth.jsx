import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import icon from '../../assets/icon.png';
import Aboutauth from './Aboutauth';
import { signup, login } from '../../action/auth';

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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

        if (isSignup && !name) {
            setError('Name is required for signup');
            setIsLoading(false);
            return;
        }

        const result = isSignup
            ? await dispatch(signup({ name, email, password }, navigate))
            : await dispatch(login({ email, password }, navigate));

        setIsLoading(false);
        if (!result.success) {
            setError(result.error);
        }
    };

    const handleSwitch = () => {
        setIsSignup(!isSignup);
        setName('');
        setEmail('');
        setPassword('');
        setError('');
    };

    return (
        <section className="auth-section">
            {isSignup && <Aboutauth />}
            <div className="auth-container-2">
                <img src={icon} alt="icon" className="login-logo" />
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
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label htmlFor="password">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>Password</h4>
                            {!isSignup && (
                                <p style={{ color: '#007ac6', fontSize: '13px' }}>
                                    Forgot Password?
                                </p>
                            )}
                        </div>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {error && (
                        <p
                            style={{
                                color: '#d0393e',
                                backgroundColor: '#fae1e2',
                                padding: '10px',
                                borderRadius: '3px',
                                marginBottom: '10px',
                                fontSize: '13px',
                            }}
                        >
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="auth-btn"
                        disabled={isLoading}
                        style={{ opacity: isLoading ? 0.7 : 1 }}
                    >
                        {isLoading ? (isSignup ? 'Signing up...' : 'Logging in...') : isSignup ? 'Sign up' : 'Log in'}
                    </button>
                </form>
                <p>
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}
                    <button
                        type="button"
                        className="handle-switch-btn"
                        onClick={handleSwitch}
                        disabled={isLoading}
                    >
                        {isSignup ? 'Log in' : 'Sign up'}
                    </button>
                </p>
            </div>
        </section>
    );
};

export default Auth;