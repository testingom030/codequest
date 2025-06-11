import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import ProfileMenu from './ProfileMenu';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  isLoggedIn: boolean;
  username?: string;
  avatar?: string;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isLoggedIn, 
  username = '', 
  avatar = '/default-avatar.svg',
  onLogout = () => {}
}) => {
  const { translate } = useLanguage();

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-t-4 border-stackoverflow-orange shadow-sm z-50">
      <div className="h-[50px] max-w-[1264px] mx-auto px-4 flex items-center">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <div className="flex items-center">
            <img
              src="/stackoverflow-logo.svg"
              alt="CodeQuest icon"
              className="h-[30px] w-[30px]"
            />
            <span className="ml-1 text-[20px] font-bold">
              CodeQuest
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center h-full ml-4">
          <button className="px-3 py-2 hover:bg-[#e3e6e8] text-[13px] text-[#525960] h-full">
            {translate('nav.products')}
          </button>
          <Link 
            to="/teams" 
            className="px-3 py-2 hover:bg-[#e3e6e8] text-[13px] text-[#525960] h-full"
          >
            {translate('nav.teams')}
          </Link>
          <Link 
            to="/about" 
            className="px-3 py-2 hover:bg-[#e3e6e8] text-[13px] text-[#525960] h-full"
          >
            {translate('nav.about')}
          </Link>
        </nav>

        {/* Search */}
        <SearchBar className="mx-4" />

        {/* Auth Buttons */}
        <div className="flex items-center ml-auto gap-2">
          {isLoggedIn ? (
            <>
              {/* Help Icon */}
              <button className="p-2 hover:bg-[#f8f9f9] rounded-sm text-[#525960]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              {/* Notifications */}
              <button className="p-2 hover:bg-[#f8f9f9] rounded-sm text-[#525960] relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Menu */}
              <ProfileMenu
                username={username}
                avatar={avatar}
                onLogout={onLogout}
              />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1.5 text-[13px] text-stackoverflow-blue bg-stackoverflow-powder hover:bg-[#b3d3ea] rounded-[3px]"
              >
                {translate('auth.login')}
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1.5 text-[13px] text-white bg-stackoverflow-blue hover:bg-[#0174cd] rounded-[3px]"
              >
                {translate('auth.signup')}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
