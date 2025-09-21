import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import './MainLayout.css';

const MainLayout = ({ 
  children, 
  title = "My App",
  navigation = [],
  sidebarNavigation = [],
  showSidebar = false,
  showFooter = true
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="main-layout">
      <Header 
        title={title}
        navigation={navigation}
        onMenuClick={showSidebar ? toggleSidebar : undefined}
      />
      
      <div className="layout-content">
        {showSidebar && (
          <Sidebar 
            isOpen={sidebarOpen}
            onToggle={toggleSidebar}
            navigation={sidebarNavigation}
          />
        )}
        
        <main className={`main-content ${showSidebar ? 'with-sidebar' : ''}`}>
          <div className="content-container">
            {children}
          </div>
        </main>
      </div>
      
      {showFooter && (
        <Footer 
          companyName={title}
          links={navigation}
          socialLinks={[
            { href: '#', icon: '📘' },
            { href: '#', icon: '🐦' },
            { href: '#', icon: '📷' },
            { href: '#', icon: '💼' }
          ]}
        />
      )}
    </div>
  );
};

export default MainLayout;
