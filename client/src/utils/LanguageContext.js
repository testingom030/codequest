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
  const [verificationId, setVerificationId] = useState(null);

  const initiateVerification = async (newLanguage) => {
    const verificationType = languages[newLanguage].verification;
    const currentUser = JSON.parse(localStorage.getItem('Profile'))?.result;

    if (!currentUser) {
      return { success: false, message: 'Please log in first' };
    }

    if (verificationType === 'none') {
      return { success: true };
    }

    setLoading(true);
    try {
      const endpoint = verificationType === 'email' ? '/verify-email' : '/verify-phone';
      const payload = {
        language: newLanguage,
        ...(verificationType === 'email' ? { email: currentUser.email } : { phone: currentUser.phone })
      };

      const response = await axios.post(`/api/language${endpoint}`, payload);
      setVerificationId(response.data.verificationId);
      return { success: true, message: `Verification code sent to your ${verificationType}` };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to send verification code' 
      };
    } finally {
      setLoading(false);
    }
  };

  const verifyAndChangeLanguage = async (code, newLanguage) => {
    if (!verificationId) {
      return { success: false, message: 'Please initiate verification first' };
    }

    setLoading(true);
    try {
      await axios.post('/api/language/verify-code', {
        code,
        verificationId,
        language: newLanguage
      });

      setCurrentLanguage(newLanguage);
      localStorage.setItem('preferredLanguage', newLanguage);
      return { success: true, message: 'Language changed successfully' };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Verification failed' 
      };
    } finally {
      setLoading(false);
      setVerificationId(null);
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const translate = (key) => {
    return languages[currentLanguage]?.translations[key] || languages.en.translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      languages,
      loading,
      translate,
      initiateVerification,
      verifyAndChangeLanguage
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
