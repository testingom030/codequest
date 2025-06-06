import React from 'react';
import { useLanguage } from '../../utils/LanguageContext';
import './Teams.css';

const Teams = () => {
  const { translate } = useLanguage();

  const teamMembers = [
    {
      id: 1,
      name: 'Hiten Kathiriya',
      role: 'Founder & CEO',
      image: 'https://avatars.githubusercontent.com/u/123456789',
      bio: 'Visionary leader with extensive experience in software development and team management.',
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Technical Lead',
      image: 'https://avatars.githubusercontent.com/u/987654321',
      bio: 'Expert in full-stack development with a focus on scalable architecture.',
      social: {
        linkedin: '#',
        github: '#'
      }
    },
    {
      id: 3,
      name: 'David Chen',
      role: 'UX/UI Design Lead',
      image: 'https://avatars.githubusercontent.com/u/456789123',
      bio: 'Creative designer passionate about creating intuitive user experiences.',
      social: {
        linkedin: '#',
        dribbble: '#'
      }
    }
  ];

  const values = [
    {
      icon: 'fa-lightbulb',
      title: 'Innovation',
      description: 'Constantly pushing boundaries and exploring new technologies.'
    },
    {
      icon: 'fa-users',
      title: 'Collaboration',
      description: 'Working together to create exceptional solutions.'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Trust',
      description: 'Building lasting relationships with our team and users.'
    },
    {
      icon: 'fa-rocket',
      title: 'Excellence',
      description: 'Striving for the highest quality in everything we do.'
    }
  ];

  return (
    <div className="teams-container">
      <header className="teams-header">
        <h1>{translate('Meet Our Team')}</h1>
        <p>{translate('Passionate individuals working together to empower developers worldwide')}</p>
      </header>

      <section className="team-values">
        <h2>{translate('Our Values')}</h2>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <i className={`fas ${value.icon}`}></i>
              <h3>{translate(value.title)}</h3>
              <p>{translate(value.description)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="team-members">
        <div className="members-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="member-card">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <h4>{translate(member.role)}</h4>
                <p>{translate(member.bio)}</p>
                <div className="social-links">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github"></i>
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                  {member.social.dribbble && (
                    <a href={member.social.dribbble} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-dribbble"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="join-team">
        <div className="join-content">
          <h2>{translate('Join Our Team')}</h2>
          <p>{translate('We're always looking for talented individuals to join our mission.')}</p>
          <button className="join-button">
            {translate('View Open Positions')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Teams;
