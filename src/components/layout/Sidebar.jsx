import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ 
  isOpen = false, 
  onToggle, 
  navigation = [],
  title = "Menu"
}) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={onToggle}
        />
      )}
      
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">{title}</h2>
          <button 
            className="sidebar-close"
            onClick={onToggle}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="sidebar-nav-list">
            {navigation.map((item, index) => (
              <li key={index} className="sidebar-nav-item">
                <a 
                  href={item.href} 
                  className="sidebar-nav-link"
                  onClick={onToggle}
                >
                  {item.icon && <span className="nav-icon">{item.icon}</span>}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <p className="sidebar-footer-text">
            Version 1.0.0
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
