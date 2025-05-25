import React, { useState } from 'react';
import { useLanguage } from '../../utils/LanguageContext';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { 
    currentLanguage, 
    languages, 
    verifyLanguageChange, 
    verifyCode,
    loading 
  } = useLanguage();

  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [error, setError] = useState('');
  const [verificationType, setVerificationType] = useState('');

  const handleLanguageChange = async (e) => {
    const selectedLanguage = e.target.value;
    if (selectedLanguage === currentLanguage) return;

    setNewLanguage(selectedLanguage);
    const result = await verifyLanguageChange(selectedLanguage);

    if (result.success) {
      setVerificationId(result.verificationId);
      setVerificationType(result.verification);
      setShowVerification(true);
      setError('');
    } else {
      setError(result.message);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    const result = await verifyCode(verificationCode, verificationId, newLanguage);

    if (result.success) {
      setShowVerification(false);
      setVerificationCode('');
      setError('');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="language-selector">
      <select 
        value={currentLanguage} 
        onChange={handleLanguageChange}
        disabled={loading || showVerification}
      >
        {Object.entries(languages).map(([code, lang]) => (
          <option key={code} value={code}>
            {lang.name}
          </option>
        ))}
      </select>

      {showVerification && (
        <div className="verification-modal">
          <div className="verification-content">
            <h3>Verify Language Change</h3>
            <p>
              {verificationType === 'email' 
                ? 'Please check your email for the verification code'
                : 'Please check your phone for the SMS code'}
            </p>
            <form onSubmit={handleVerificationSubmit}>
              <input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
              <div className="verification-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowVerification(false);
                    setVerificationCode('');
                    setError('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
