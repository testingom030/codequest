import React from 'react';
import { useLanguage } from '../../utils/LanguageContext';
import './Products.css';

const Products = () => {
  const { translate } = useLanguage();

  const products = [
    {
      id: 1,
      name: 'CodeQuest Enterprise',
      description: 'Complete solution for large organizations with advanced security, dedicated support, and custom integrations.',
      features: [
        'Advanced Security Controls',
        'Dedicated Support',
        'Custom Integrations',
        'Team Analytics',
        'Priority Access'
      ],
      icon: 'fa-building'
    },
    {
      id: 2,
      name: 'CodeQuest Teams',
      description: 'Perfect for growing teams with collaboration features, knowledge sharing, and team management tools.',
      features: [
        'Team Collaboration',
        'Knowledge Base',
        'Project Management',
        'Team Reporting',
        'API Access'
      ],
      icon: 'fa-users-gear'
    },
    {
      id: 3,
      name: 'CodeQuest Individual',
      description: 'Ideal for individual developers looking to enhance their skills and connect with the community.',
      features: [
        'Community Access',
        'Personal Portfolio',
        'Learning Resources',
        'Skill Assessment',
        'Job Board Access'
      ],
      icon: 'fa-user'
    }
  ];

  return (
    <div className="products-container">
      <header className="products-header">
        <h1>{translate('Our Products')}</h1>
        <p className="products-subtitle">
          {translate('Empowering developers and teams with the tools they need to succeed')}
        </p>
      </header>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-icon">
              <i className={`fas ${product.icon}`}></i>
            </div>
            <h2>{translate(product.name)}</h2>
            <p className="product-description">{translate(product.description)}</p>
            <div className="product-features">
              <h3>{translate('Key Features')}</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <i className="fas fa-check"></i>
                    {translate(feature)}
                  </li>
                ))}
              </ul>
            </div>
            <button className="product-cta">
              {translate('Learn More')}
            </button>
          </div>
        ))}
      </div>

      <section className="product-comparison">
        <h2>{translate('Compare Plans')}</h2>
        <div className="comparison-table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>{translate('Features')}</th>
                <th>{translate('Individual')}</th>
                <th>{translate('Teams')}</th>
                <th>{translate('Enterprise')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{translate('Community Access')}</td>
                <td><i className="fas fa-check"></i></td>
                <td><i className="fas fa-check"></i></td>
                <td><i className="fas fa-check"></i></td>
              </tr>
              <tr>
                <td>{translate('Team Collaboration')}</td>
                <td><i className="fas fa-minus"></i></td>
                <td><i className="fas fa-check"></i></td>
                <td><i className="fas fa-check"></i></td>
              </tr>
              <tr>
                <td>{translate('Custom Integrations')}</td>
                <td><i className="fas fa-minus"></i></td>
                <td><i className="fas fa-minus"></i></td>
                <td><i className="fas fa-check"></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Products;
