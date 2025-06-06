import React from 'react';
import { useLanguage } from '../../utils/LanguageContext';
import './About.css';

const About = () => {
  const { translate } = useLanguage();

  return (
    <div className="about-container">
      <h1>{translate('About CodeQuest')}</h1>
      
      <section className="about-section">
        <h2>{translate('Our Mission')}</h2>
        <p>{translate('CodeQuest is a platform dedicated to helping developers learn, share their knowledge, and build their careers. We provide a space for technical discussion, knowledge sharing, and community engagement.')}</p>
      </section>

      <section className="about-section">
        <h2>{translate('Key Features')}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-question-circle"></i>
            <h3>{translate('Q&A Platform')}</h3>
            <p>{translate('Ask questions, get answers, and help others with their coding challenges.')}</p>
          </div>

          <div className="feature-card">
            <i className="fas fa-users"></i>
            <h3>{translate('Community')}</h3>
            <p>{translate('Connect with other developers, share experiences, and grow together.')}</p>
          </div>

          <div className="feature-card">
            <i className="fas fa-share-alt"></i>
            <h3>{translate('Social Sharing')}</h3>
            <p>{translate('Share your achievements, projects, and insights with the community.')}</p>
          </div>

          <div className="feature-card">
            <i className="fas fa-globe"></i>
            <h3>{translate('Multi-language Support')}</h3>
            <p>{translate('Access the platform in multiple languages for a better experience.')}</p>
          </div>
        </div>
      </section>      <section className="about-section">
        <h2>{translate('Contact Us')}</h2>
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <p>+91 9099590979</p>
          </div>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <p>B-902, Vaibhav Luxuria<br/>Kumabharia, Surat</p>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <p>hitenvk22@gmail.com</p>
          </div>
          <div>
            <i className="fas fa-phone"></i>
            <p>+1 (555) 123-4567</p>
          </div>
          <div>
            <i className="fas fa-map-marker-alt"></i>
            <p>123 Tech Street, Silicon Valley, CA 94025</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
