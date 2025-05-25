import React, { createContext, useContext, useState, useEffect } from 'react';
import { languages } from './languages';
import axios from 'axios';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [loading, setLoading] = useState(false);

  const verifyLanguageChange = async (newLanguage) => {
    const verificationType = languages[newLanguage].verification;
    const currentUser = JSON.parse(localStorage.getItem('Profile'))?.result;

    if (!currentUser) {
      return { success: false, message: 'Please log in first' };
    }

    setLoading(true);
    try {
      if (verificationType === 'email') {
        // Send email verification
        const response = await axios.post('/api/users/verify-email', {
          email: currentUser.email,
          language: newLanguage
        });
        return { success: true, verification: 'email', ...response.data };
      } else {
        // Send SMS verification
        const response = await axios.post('/api/users/verify-phone', {
          phone: currentUser.phoneNumber,
          language: newLanguage
        });
        return { success: true, verification: 'sms', ...response.data };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Verification failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (code, verificationId, newLanguage) => {
    try {
      const response = await axios.post('/api/users/verify-code', {
        code,
        verificationId,
        language: newLanguage
      });

      if (response.data.success) {
        setCurrentLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
      }

      return response.data;
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Invalid verification code' 
      };
    }
  };

  const translate = (key) => {
    return languages[currentLanguage]?.translations[key] || key;
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      languages,
      translate,
      verifyLanguageChange,
      verifyCode,
      loading
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
