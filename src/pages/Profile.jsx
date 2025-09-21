import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ currentUser, userProfilePhoto, setUserProfilePhoto, posts, setPosts }) => {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [activeTab, setActiveTab] = useState('messages');
  const [userBio, setUserBio] = useState('Welcome to my Reddit profile!');
  const [showBioModal, setShowBioModal] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'u/reddit_admin',
      subject: 'Welcome to Reddit Clone!',
      content: 'Thanks for joining our community. We\'re excited to have you here!',
      time: '2 days ago',
      read: false
    },
    {
      id: 2,
      from: 'u/community_mod',
      subject: 'Community Guidelines',
      content: 'Please take a moment to review our community guidelines to ensure a positive experience for everyone.',
      time: '1 week ago',
      read: true
    },
    {
      id: 3,
      from: 'u/friend_user',
      subject: 'Great post!',
      content: 'I really enjoyed your recent post about React hooks. Keep up the great content!',
      time: '3 days ago',
      read: false
    }
  ]);

  // Filter posts to show only current user's posts for stats
  const userPosts = posts.filter(post => post.author === currentUser);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoData = e.target.result;
        if (setUserProfilePhoto) {
          setUserProfilePhoto(photoData);
        }
        setShowPhotoModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBioUpdate = (e) => {
    e.preventDefault();
    const newBio = e.target.bio.value;
    setUserBio(newBio);
    setShowBioModal(false);
  };

  const markMessageAsRead = (messageId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  const deleteMessage = (messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  if (!currentUser) {
    return (
      <div className="profile-page">
        <div className="login-prompt">
          <h2>Please log in to view your profile</h2>
          <p>You need to be logged in to access your profile page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-banner">
          <div className="banner-content">
            <div className="profile-info">
              <div className="profile-avatar-container">
                {userProfilePhoto ? (
                  <img 
                    src={userProfilePhoto} 
                    alt="Profile" 
                    className="profile-avatar"
                    onClick={() => setShowPhotoModal(true)}
                  />
                ) : (
                  <div 
                    className="profile-avatar-placeholder"
                    onClick={() => setShowPhotoModal(true)}
                  >
                    👤
                  </div>
                )}
                <button 
                  className="change-photo-btn"
                  onClick={() => setShowPhotoModal(true)}
                >
                  📷
                </button>
              </div>
              <div className="profile-details">
                <h1 className="profile-username">{currentUser}</h1>
                <p className="profile-bio" onClick={() => setShowBioModal(true)}>
                  {userBio}
                </p>
                <div className="profile-stats">
                  <div className="stat">
                    <span className="stat-number">{userPosts.length}</span>
                    <span className="stat-label">Posts</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">
                      {userPosts.reduce((sum, post) => sum + post.upvotes, 0)}
                    </span>
                    <span className="stat-label">Karma</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{unreadCount}</span>
                    <span className="stat-label">Unread Messages</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            💬 Messages {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
          </button>
          <button 
            className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            📊 Activity
          </button>
          <button 
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Settings
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'messages' && (
            <div className="messages-section">
              <div className="messages-header">
                <h3>Your Messages</h3>
                <span className="message-count">{messages.length} total messages</span>
              </div>
              <div className="messages-list">
                {messages.length === 0 ? (
                  <div className="no-messages">
                    <h4>No messages yet</h4>
                    <p>You'll receive messages from other users and moderators here.</p>
                  </div>
                ) : (
                  messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`message-card ${!message.read ? 'unread' : ''}`}
                      onClick={() => markMessageAsRead(message.id)}
                    >
                      <div className="message-header">
                        <div className="message-from">
                          <span className="sender">{message.from}</span>
                          <span className="message-time">{message.time}</span>
                        </div>
                        <div className="message-actions">
                          {!message.read && <span className="unread-indicator">●</span>}
                          <button 
                            className="delete-message-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMessage(message.id);
                            }}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <h4 className="message-subject">{message.subject}</h4>
                      <p className="message-content">{message.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="activity-section">
              <h3>Recent Activity</h3>
              <div className="activity-stats">
                <div className="activity-card">
                  <h4>Posting Activity</h4>
                  <p>You've created {userPosts.length} posts</p>
                  <div className="activity-chart">
                    <div className="chart-bar" style={{height: '60%'}}></div>
                    <div className="chart-bar" style={{height: '80%'}}></div>
                    <div className="chart-bar" style={{height: '40%'}}></div>
                    <div className="chart-bar" style={{height: '90%'}}></div>
                    <div className="chart-bar" style={{height: '70%'}}></div>
                  </div>
                </div>
                <div className="activity-card">
                  <h4>Engagement</h4>
                  <p>Total karma: {userPosts.reduce((sum, post) => sum + post.upvotes, 0)}</p>
                  <div className="karma-breakdown">
                    <div className="karma-item">
                      <span>Posts: {userPosts.length}</span>
                    </div>
                    <div className="karma-item">
                      <span>Comments: {userPosts.reduce((sum, post) => sum + post.comments, 0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-section">
              <h3>Profile Settings</h3>
              <div className="settings-grid">
                <div className="setting-card">
                  <h4>Profile Information</h4>
                  <p>Manage your profile details and bio</p>
                  <button 
                    className="setting-btn"
                    onClick={() => setShowBioModal(true)}
                  >
                    Edit Bio
                  </button>
                </div>
                <div className="setting-card">
                  <h4>Profile Photo</h4>
                  <p>Update your profile picture</p>
                  <button 
                    className="setting-btn"
                    onClick={() => setShowPhotoModal(true)}
                  >
                    Change Photo
                  </button>
                </div>
                <div className="setting-card">
                  <h4>Privacy</h4>
                  <p>Control who can see your profile</p>
                  <button className="setting-btn">Privacy Settings</button>
                </div>
                <div className="setting-card">
                  <h4>Notifications</h4>
                  <p>Manage your notification preferences</p>
                  <button className="setting-btn">Notification Settings</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change Photo Modal */}
      {showPhotoModal && (
        <div className="modal-overlay" onClick={() => setShowPhotoModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Change Profile Photo</h2>
              <button 
                className="close-btn"
                onClick={() => setShowPhotoModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="photo-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="file-input"
                  id="photoUpload"
                />
                <label htmlFor="photoUpload" className="file-input-label">
                  📷 Choose a new profile photo
                </label>
                <p className="upload-hint">Select an image file to update your profile photo</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Bio Modal */}
      {showBioModal && (
        <div className="modal-overlay" onClick={() => setShowBioModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Bio</h2>
              <button 
                className="close-btn"
                onClick={() => setShowBioModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleBioUpdate}>
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  defaultValue={userBio}
                  rows="4"
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowBioModal(false)}>
                  Cancel
                </button>
                <button type="submit">Save Bio</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;