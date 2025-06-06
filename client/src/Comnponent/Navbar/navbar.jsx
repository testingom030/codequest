import React, { useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import bars from '../../assets/bars-solid.svg'
import logo from '../../assets/logo.png';
import search from '../../assets/search-solid.svg'
import Avatar from '../Avatar/Avatar';
import './navbar.css';
import {setcurrentuser} from '../../action/currentuser'
import {jwtDecode} from "jwt-decode"
import { useLanguage } from '../../utils/LanguageContext';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

function Navbar({ handleslidein }) {
    var User = useSelector((state)=>state.currentuserreducer)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { translate } = useLanguage();

    const handlelogout = useCallback(() => {
        dispatch({type:"LOGOUT"})
        navigate("/")
        dispatch(setcurrentuser(null))
    }, [dispatch, navigate])

    useEffect(()=>{
        const token =User?.token;
        if(token){
            const decodedtoken=jwtDecode(token);
            if(decodedtoken.exp * 1000 < new Date().getTime()){
                handlelogout();
            }
        }
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))))
    },[User?.token, dispatch, handlelogout]);

    return (
        <nav className="main-nav">
            <div className="navbar">
                <button className="slide-in-icon" onClick={() => handleslidein()}>
                    <img src={bars} alt="bars" width='15' />
                </button>
                <div className="navbar-1">
                    <Link to='/' className='nav-item nav-logo'>
                        <img src={logo} alt="logo" />
                    </Link>
                    <div className="nav-links">
                        <Link to="/products" className="nav-item nav-btn">
                            {translate('Products')}
                        </Link>
                        <Link to="/teams" className="nav-item nav-btn">
                            {translate('Teams')}
                        </Link>
                        <Link to="/about" className="nav-item nav-btn">
                            {translate('About')}
                        </Link>
                    </div>
                </div>
                <div className="navbar-2">
                    <form>
                        <input type="text" placeholder={translate('Search...')} />
                        <img src={search} alt="search" width="18" className='search-icon' />
                    </form>
                    {User === null ?
                        <Link to='/Auth' className='nav-item nav-links nav-btn'>{translate('Log in')}</Link> :
                        <>
                            <Avatar backgroundColor='#009dff' px='12px' py='7px' borderRadius='50%' color='white'>
                                <Link to={`/Users/${User?.result?._id}`} style={{ color: 'white', textDecoration: 'none' }}>{User.result.name.charAt(0).toUpperCase()}</Link>
                            </Avatar>
                            <button className='nav-item nav-links nav-btn' onClick={handlelogout}>{translate('Log out')}</button>
                        </>
                    }
                    <LanguageSelector />
                </div>
            </div>
        </nav>
    )
}

export default Navbar