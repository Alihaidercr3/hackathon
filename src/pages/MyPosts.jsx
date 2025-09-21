import React, { useState } from 'react';
import './MyPosts.css';

const MyPosts = ({ posts, setPosts, currentUser }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [sortBy, setSortBy] = useState('new');

  // Filter posts to show only current user's posts
  const myPosts = posts.filter(post => post.author === currentUser);

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowEditModal(true);
  };

  const handleUpdatePost = (e) => {
    e.preventDefault();
    if (!editingPost.title || !editingPost.subreddit) return;

    setPosts(prev => prev.map(post => 
      post.id === editingPost.id ? editingPost : post
    ));
    setShowEditModal(false);
    setEditingPost(null);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== postId));
    }
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
  };

  const getSortedPosts = () => {
    let sortedPosts = [...myPosts];
    
    switch (sortBy) {
      case 'hot':
        sortedPosts.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'new':
        sortedPosts.sort((a, b) => new Date(b.time) - new Date(a.time));
        break;
      case 'top':
        sortedPosts.sort((a, b) => b.upvotes - a.upvotes);
        break;
      default:
        break;
    }
    
    return sortedPosts;
  };

  if (!currentUser) {
    return (
      <div className="my-posts-page">
        <div className="login-prompt">
          <h2>Please log in to view your posts</h2>
          <p>You need to be logged in to manage your posts.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-posts-page">
      <div className="my-posts-header">
        <h1>My Posts</h1>
        <div className="posts-stats">
          <span className="stat">
            <strong>{myPosts.length}</strong> Total Posts
          </span>
          <span className="stat">
            <strong>{myPosts.reduce((sum, post) => sum + post.upvotes, 0)}</strong> Total Upvotes
          </span>
        </div>
      </div>

      <div className="sort-controls">
        <div className="sort-options">
          <button 
            className={`sort-btn ${sortBy === 'hot' ? 'active' : ''}`}
            onClick={() => handleSort('hot')}
          >
            Hot
          </button>
          <button 
            className={`sort-btn ${sortBy === 'new' ? 'active' : ''}`}
            onClick={() => handleSort('new')}
          >
            New
          </button>
          <button 
            className={`sort-btn ${sortBy === 'top' ? 'active' : ''}`}
            onClick={() => handleSort('top')}
          >
            Top
          </button>
        </div>
      </div>

      <div className="my-posts-container">
        {getSortedPosts().length === 0 ? (
          <div className="no-posts">
            <h3>No posts yet</h3>
            <p>You haven't created any posts yet. Start sharing your thoughts!</p>
          </div>
        ) : (
          getSortedPosts().map(post => (
            <div key={post.id} className="my-post-card">
              <div className="post-header">
                <div className="post-meta">
                  <span className="subreddit">{post.subreddit}</span>
                  <span className="post-time">{post.time}</span>
                </div>
                <div className="post-stats">
                  <span className="upvotes">⬆️ {post.upvotes}</span>
                  <span className="comments">💬 {post.comments}</span>
                </div>
              </div>
              
              <h3 className="post-title">{post.title}</h3>
              
              {post.type === 'text' && post.content && (
                <p className="post-content">{post.content}</p>
              )}
              
              {post.type === 'image' && post.image && (
                <div className="post-image-container">
                  <img src={post.image} alt="Post" className="post-image" />
                </div>
              )}
              
              {post.type === 'link' && post.link && (
                <div className="post-link-container">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="post-link"
                  >
                    <div className="link-preview">
                      <div className="link-icon">🔗</div>
                      <div className="link-content">
                        <div className="link-title">{post.title}</div>
                        <div className="link-url">{post.link}</div>
                      </div>
                    </div>
                  </a>
                </div>
              )}
              
              <div className="post-actions">
                <button 
                  className="action-btn edit-btn"
                  onClick={() => handleEditPost(post)}
                >
                  ✏️ Edit
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDeletePost(post.id)}
                >
                  🗑️ Delete
                </button>
                <span className="post-type-badge">
                  {post.type === 'text' && '📝 Text'}
                  {post.type === 'image' && '🖼️ Image'}
                  {post.type === 'link' && '🔗 Link'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Post Modal */}
      {showEditModal && editingPost && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Post</h2>
              <button 
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleUpdatePost}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Subreddit</label>
                <input
                  type="text"
                  value={editingPost.subreddit}
                  onChange={(e) => setEditingPost({...editingPost, subreddit: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Post Type</label>
                <select
                  value={editingPost.type}
                  onChange={(e) => setEditingPost({...editingPost, type: e.target.value})}
                >
                  <option value="text">📝 Text Post</option>
                  <option value="image">🖼️ Image Post</option>
                  <option value="link">🔗 Link Post</option>
                </select>
              </div>
              {editingPost.type === 'text' && (
                <div className="form-group">
                  <label>Content</label>
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                    rows="4"
                  />
                </div>
              )}
              {editingPost.type === 'image' && (
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    value={editingPost.image || ''}
                    onChange={(e) => setEditingPost({...editingPost, image: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              )}
              {editingPost.type === 'link' && (
                <div className="form-group">
                  <label>Link URL</label>
                  <input
                    type="url"
                    value={editingPost.link || ''}
                    onChange={(e) => setEditingPost({...editingPost, link: e.target.value})}
                    placeholder="https://example.com"
                  />
                </div>
              )}
              <div className="modal-actions">
                <button type="button" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit">Update Post</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
