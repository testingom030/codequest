import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./Auth.css"
import icon from '../../assets/icon.png'
import Aboutauth from './Aboutauth'
import { signup, login } from '../../action/auth'
const Auth = () => {
    const [issignup, setissignup] = useState(false)
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        setIsLoading(true);
        
        if (!email || !password) {
            setError("Email and password are required");
            setIsLoading(false);
            return;
        }
        
        if (issignup && !name) {
            setError("Name is required for signup");
            setIsLoading(false);
            return;
        }

        const result = issignup 
            ? await dispatch(signup({ name, email, password }, navigate))
            : await dispatch(login({ email, password }, navigate));
            
        setIsLoading(false);
        if (!result.success) {
            setError(result.error);
        }
    }
    const handleswitch = () => {
        setissignup(!issignup);
        setname("");
        setemail("");
        setpassword("");
        setError(""); // Clear any existing errors when switching forms
    }

    return (
        <section className="auth-section">
            {issignup && <Aboutauth />}
            <div className="auth-container-2">
                <img src={icon} alt="icon" className='login-logo' />
                <form onSubmit={handlesubmit}>
                    {issignup && (
                        <label htmlFor="name">
                            <h4>Display Name</h4>
                            <input type="text" id='name' name='name' value={name} onChange={(e) => {
                                setname(e.target.value);
                            }} />
                        </label>
                    )}
                    <label htmlFor="email">
                        <h4>Email</h4>
                        <input type="email" id='email' name='email' value={email} onChange={(e) => {
                            setemail(e.target.value);
                        }} />
                    </label>
                    <label htmlFor="password">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h4>Password</h4>
                            {!issignup && (
                                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                                    Forgot Password?
                                </p>
                            )}
                        </div>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => {
                            setpassword(e.target.value)
                        }} />
                    </label>
                    {error && (
                        <p style={{ 
                            color: '#d0393e',
                            backgroundColor: '#fae1e2',
                            padding: '10px',
                            borderRadius: '3px',
                            marginBottom: '10px',
                            fontSize: '13px'
                        }}>
                            {error}
                        </p>
                    )}
                    <button 
                        type='submit' 
                        className='auth-btn'
                        disabled={isLoading}
                        style={{ opacity: isLoading ? 0.7 : 1 }}
                    >
                        {isLoading 
                            ? (issignup ? "Signing up..." : "Logging in...") 
                            : (issignup ? "Sign up" : "Log in")}
                    </button>
                </form>
                <p>
                    {issignup ? "Already have an account?" : "Don't have an account"}
                    <button 
                        type='button' 
                        className='handle-switch-btn' 
                        onClick={handleswitch}
                        disabled={isLoading}
                    >
                        {issignup ? "Log in" : "Sign up"}
                    </button>
                </p>
            </div>
        </section>
    )
}

export default Auth