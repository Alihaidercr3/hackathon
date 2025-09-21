import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ title = "My App", navigation = [] }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <Link to="/" className="header-title">{title}</Link>
        </div>
        <nav className="header-nav">
          <ul className="nav-list">
            {navigation.map((item, index) => (
              <li key={index} className="nav-item">
                <Link to={item.href} className="nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
