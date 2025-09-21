import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MyPosts from './pages/MyPosts';
import Profile from './pages/Profile';
import './pages/Home.css';
import './pages/MyPosts.css';
import './pages/Profile.css';

const App = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Just learned React hooks and I'm amazed!",
      author: "u/reactdev",
      subreddit: "r/reactjs",
      time: "2 hours ago",
      upvotes: 42,
      comments: 8,
      content: "After struggling with class components for months, I finally tried hooks and everything just clicked. The code is so much cleaner!",
      type: "text"
    },
    {
      id: 2,
      title: "Beautiful sunset from my coding session",
      author: "u/coderlife",
      subreddit: "r/programming",
      time: "4 hours ago",
      upvotes: 156,
      comments: 23,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      type: "image"
    },
    {
      id: 3,
      title: "Check out this amazing CSS animation tutorial",
      author: "u/webdev",
      subreddit: "r/webdev",
      time: "6 hours ago",
      upvotes: 89,
      comments: 15,
      link: "https://css-tricks.com/animations/",
      type: "link"
    },
    {
      id: 4,
      title: "JavaScript ES2024 new features are incredible!",
      author: "u/jsdev",
      subreddit: "r/javascript",
      time: "8 hours ago",
      upvotes: 203,
      comments: 45,
      content: "The new optional chaining and nullish coalescing operators are game changers. No more nested if statements!",
      type: "text"
    },
    {
      id: 5,
      title: "My home office setup for remote work",
      author: "u/remoteworker",
      subreddit: "r/workspace",
      time: "1 day ago",
      upvotes: 78,
      comments: 12,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      type: "image"
    }
  ]);
  
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfilePhoto, setUserProfilePhoto] = useState(null);

  return (
    <Router>
      <div className="app">
        <nav className="app-nav">
          <div className="nav-left">
            <div className="nav-brand">
              <Link to="/">
                <div className="logo">
                  <div className="logo-icon">🔴</div>
                  <span className="logo-text">reddit</span>
                </div>
              </Link>
            </div>
            <div className="search-container">
              <form 
                className="search-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const searchQuery = e.target.querySelector('.search-input').value;
                  if (searchQuery.trim()) {
                    window.dispatchEvent(new CustomEvent('searchPosts', { detail: searchQuery }));
                  }
                }}
              >
                <input
                  type="text"
                  placeholder="Search Reddit"
                  className="search-input"
                />
                <button type="submit" className="search-btn">
                  🔍
                </button>
              </form>
            </div>
          </div>
          
          <div className="nav-right">
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/my-posts">My Posts</Link>
            </div>
            <div className="user-actions">
              {currentUser ? (
                <>
                  <button 
                    className="nav-btn create-post-btn"
                    onClick={() => window.dispatchEvent(new CustomEvent('openCreatePostModal'))}
                  >
                    Create Post
                  </button>
                  <div className="user-menu">
                    <Link to="/profile" className="profile-link">
                      {userProfilePhoto ? (
                        <img 
                          src={userProfilePhoto} 
                          alt="Profile" 
                          className="profile-photo"
                        />
                      ) : (
                        <div className="profile-photo-placeholder">
                          👤
                        </div>
                      )}
                    </Link>
                    <span className="user-name">{currentUser}</span>
                    <button 
                      className="nav-btn logout-btn"
                      onClick={() => {
                        setCurrentUser(null);
                        setUserProfilePhoto(null);
                      }}
                    >
                      Logout
                    </button>
      </div>
                </>
              ) : (
                <>
                  <button 
                    className="nav-btn login-btn"
                    onClick={() => window.dispatchEvent(new CustomEvent('openLoginModal'))}
                  >
                    Log In
                  </button>
                  <button 
                    className="nav-btn signup-btn"
                    onClick={() => window.dispatchEvent(new CustomEvent('openSignupModal'))}
                  >
                    Sign Up
        </button>
                </>
              )}
            </div>
          </div>
        </nav>
        
        <Routes>
          <Route 
            path="/" 
            element={<Home posts={posts} setPosts={setPosts} currentUser={currentUser} setCurrentUser={setCurrentUser} userProfilePhoto={userProfilePhoto} setUserProfilePhoto={setUserProfilePhoto} />} 
          />
          <Route 
            path="/my-posts" 
            element={<MyPosts posts={posts} setPosts={setPosts} currentUser={currentUser} />} 
          />
          <Route 
            path="/profile" 
            element={<Profile posts={posts} setPosts={setPosts} currentUser={currentUser} userProfilePhoto={userProfilePhoto} setUserProfilePhoto={setUserProfilePhoto} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;