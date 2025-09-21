import React, { useState } from 'react';
import './Home.css';

const Home = ({ posts: propPosts, setPosts: propSetPosts, currentUser: propCurrentUser, setCurrentUser: propSetCurrentUser, userProfilePhoto: propProfilePhoto, setUserProfilePhoto: propSetProfilePhoto }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(propCurrentUser || null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    subreddit: '',
    type: 'text',
    image: null,
    video: null,
    link: ''
  });
  const [profilePhoto, setProfilePhoto] = useState(propProfilePhoto || null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState({
    1: [
      { id: 1, author: 'u/dev_expert', content: 'Great question! I think Rust is definitely underrated.', upvotes: 15, time: '1 hour ago', replies: [
        { id: 101, author: 'u/rust_advocate', content: 'I agree! Rust\'s ownership system is revolutionary.', upvotes: 8, time: '50 min ago', replies: [] },
        { id: 102, author: 'u/performance_dev', content: 'The zero-cost abstractions are amazing.', upvotes: 6, time: '45 min ago', replies: [] }
      ] },
      { id: 2, author: 'u/rust_fan', content: 'Rust has amazing memory safety features!', upvotes: 8, time: '45 min ago', replies: [] },
      { id: 3, author: 'u/golang_user', content: 'Go is also underrated for backend development.', upvotes: 12, time: '30 min ago', replies: [] },
      { id: 4, author: 'u/python_dev', content: 'Python is great but sometimes overlooked for performance.', upvotes: 6, time: '25 min ago', replies: [] },
      { id: 5, author: 'u/elixir_fan', content: 'Elixir deserves more recognition for concurrent programming.', upvotes: 9, time: '20 min ago', replies: [] }
    ],
    2: [
      { id: 6, author: 'u/react_dev', content: 'Congratulations! What did you build?', upvotes: 12, time: '2 hours ago', replies: [
        { id: 103, author: 'u/newbie_dev', content: 'A simple todo app with hooks and state management!', upvotes: 5, time: '1.5 hours ago', replies: [] },
        { id: 104, author: 'u/react_mentor', content: 'That\'s a great starting point! Keep it up!', upvotes: 7, time: '1 hour ago', replies: [] }
      ] },
      { id: 7, author: 'u/frontend_guru', content: 'Welcome to the React community!', upvotes: 8, time: '1.5 hours ago', replies: [] },
      { id: 8, author: 'u/js_enthusiast', content: 'Great job! Keep building and learning.', upvotes: 15, time: '1 hour ago', replies: [] },
      { id: 9, author: 'u/code_mentor', content: 'What was the most challenging part?', upvotes: 7, time: '45 min ago', replies: [] },
      { id: 10, author: 'u/web_dev', content: 'Share your code if you want feedback!', upvotes: 11, time: '30 min ago', replies: [] }
    ],
    3: [
      { id: 11, author: 'u/css_expert', content: 'Grid for 2D layouts, Flexbox for 1D layouts.', upvotes: 25, time: '3 hours ago', replies: [] },
      { id: 12, author: 'u/designer_dev', content: 'Great explanation! This clears up a lot of confusion.', upvotes: 18, time: '2.5 hours ago', replies: [] },
      { id: 13, author: 'u/frontend_lead', content: 'I always use Grid for page layouts and Flexbox for components.', upvotes: 22, time: '2 hours ago', replies: [] },
      { id: 14, author: 'u/responsive_dev', content: 'What about responsive design considerations?', upvotes: 14, time: '1.5 hours ago', replies: [] },
      { id: 15, author: 'u/css_master', content: 'Both work great with media queries!', upvotes: 16, time: '1 hour ago', replies: [] }
    ],
    4: [
      { id: 16, author: 'u/ai_researcher', content: 'AI will definitely change how we write code.', upvotes: 45, time: '5 hours ago', replies: [] },
      { id: 17, author: 'u/tech_futurist', content: 'I think we\'ll see more no-code/low-code solutions.', upvotes: 32, time: '4.5 hours ago', replies: [] },
      { id: 18, author: 'u/senior_dev', content: 'But traditional coding skills will still be valuable.', upvotes: 28, time: '4 hours ago', replies: [] },
      { id: 19, author: 'u/startup_founder', content: 'AI tools will make development faster, not replace developers.', upvotes: 35, time: '3.5 hours ago', replies: [] },
      { id: 20, author: 'u/tech_writer', content: 'The key is learning to work with AI, not against it.', upvotes: 41, time: '3 hours ago', replies: [] }
    ]
  });
  const [likedComments, setLikedComments] = useState(new Set());
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [posts, setPosts] = useState(propPosts || [
    {
      id: 1,
      title: "What's the most underrated programming language you've used?",
      author: "u/coder123",
      subreddit: "r/programming",
      time: "2 hours ago",
      upvotes: 1247,
      comments: 89,
      content: "I've been using Rust for a few months now and I'm amazed by its performance and safety features. What languages do you think deserve more recognition?",
      image: null,
      type: "text"
    },
    {
      id: 2,
      title: "Just finished building my first React app!",
      author: "u/newbie_dev",
      subreddit: "r/reactjs",
      time: "4 hours ago",
      upvotes: 892,
      comments: 156,
      content: "After 3 months of learning, I finally built a todo app with React. It's not much but I'm proud of it!",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      type: "image"
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox - When to use which?",
      author: "u/css_master",
      subreddit: "r/webdev",
      time: "6 hours ago",
      upvotes: 2156,
      comments: 234,
      content: "I see a lot of confusion about when to use CSS Grid vs Flexbox. Here's my take on it...",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      type: "image"
    },
    {
      id: 4,
      title: "The future of web development in 2024",
      author: "u/future_dev",
      subreddit: "r/webdev",
      time: "8 hours ago",
      upvotes: 3421,
      comments: 567,
      content: "With AI tools becoming more prevalent, how do you think web development will evolve?",
      image: null,
      type: "text"
    },
    {
      id: 5,
      title: "My journey from zero to full-stack developer",
      author: "u/journey_dev",
      subreddit: "r/learnprogramming",
      time: "12 hours ago",
      upvotes: 1876,
      comments: 298,
      content: "Started coding 2 years ago with no background. Here's what I learned along the way...",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      type: "image"
    },
    {
      id: 6,
      title: "Beautiful sunset from my coding session today",
      author: "u/nature_coder",
      subreddit: "r/programming",
      time: "1 day ago",
      upvotes: 3421,
      comments: 234,
      content: "",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop",
      type: "image"
    },
    {
      id: 7,
      title: "My home office setup for remote work",
      author: "u/remote_dev",
      subreddit: "r/webdev",
      time: "1 day ago",
      upvotes: 1876,
      comments: 156,
      content: "",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      type: "image"
    },
    {
      id: 8,
      title: "JavaScript vs TypeScript - Which one should you learn first?",
      author: "u/js_expert",
      subreddit: "r/learnprogramming",
      time: "2 days ago",
      upvotes: 2156,
      comments: 567,
      content: "I've been teaching programming for 5 years and this is the question I get asked most often. Here's my honest take...",
      image: null,
      type: "text"
    },
    {
      id: 9,
      title: "Amazing React tutorial that changed my understanding",
      author: "u/react_learner",
      subreddit: "r/reactjs",
      time: "3 days ago",
      upvotes: 3421,
      comments: 234,
      content: "",
      image: null,
      type: "link",
      link: "https://react.dev/learn"
    },
    {
      id: 10,
      title: "Free coding bootcamp resources for 2024",
      author: "u/bootcamp_helper",
      subreddit: "r/learnprogramming",
      time: "4 days ago",
      upvotes: 1876,
      comments: 156,
      content: "",
      image: null,
      type: "link",
      link: "https://www.freecodecamp.org"
    }
  ]);

  const [upvotedPosts, setUpvotedPosts] = useState(new Set());
  const [downvotedPosts, setDownvotedPosts] = useState(new Set());

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subreddit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setIsSearching(false);
      setFilteredPosts([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setFilteredPosts([]);
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    let sortedPosts = [...posts];
    
    switch (sortType) {
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
    
    setPosts(sortedPosts);
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = e.target.result;
        if (type === 'image') {
          setNewPost(prev => ({ ...prev, image: fileData, video: null }));
        } else if (type === 'video') {
          setNewPost(prev => ({ ...prev, video: fileData, image: null }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.subreddit) return;
    
    const post = {
      id: Date.now(),
      title: newPost.title,
      author: currentUser || 'u/anonymous',
      subreddit: newPost.subreddit,
      time: 'just now',
      upvotes: 1,
      comments: 0,
      content: newPost.content,
      image: newPost.image,
      video: newPost.video,
      link: newPost.link,
      type: newPost.type
    };
    
    setPosts(prev => [post, ...prev]);
    if (propSetPosts) propSetPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', subreddit: '', type: 'text', image: null, video: null, link: '' });
    setShowCreatePostModal(false);
  };

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      author: currentUser || 'u/anonymous',
      content: newComment,
      upvotes: 1,
      time: 'just now',
      replies: []
    };
    
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment]
    }));
    
    setNewComment('');
  };

  const handleLikeComment = (postId, commentId) => {
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId].map(comment => {
        if (comment.id === commentId) {
          const isLiked = likedComments.has(commentId);
          return {
            ...comment,
            upvotes: isLiked ? comment.upvotes - 1 : comment.upvotes + 1
          };
        }
        return comment;
      })
    }));

    setLikedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const handleReply = (postId, commentId) => {
    if (!replyText.trim()) return;
    
    const reply = {
      id: Date.now(),
      author: currentUser || 'u/anonymous',
      content: replyText,
      upvotes: 1,
      time: 'just now',
      replies: []
    };
    
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId].map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, reply]
          };
        }
        return comment;
      })
    }));
    
    setReplyText('');
    setReplyingTo(null);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    setCurrentUser(username);
    if (propSetCurrentUser) propSetCurrentUser(username);
    setShowLoginModal(false);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const photoFile = e.target.profilePhoto?.files[0];
    
    if (photoFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoData = e.target.result;
        setProfilePhoto(photoData);
        if (propSetProfilePhoto) propSetProfilePhoto(photoData);
      };
      reader.readAsDataURL(photoFile);
    }
    
    setCurrentUser(username);
    if (propSetCurrentUser) propSetCurrentUser(username);
    setShowSignupModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setProfilePhoto(null);
    if (propSetCurrentUser) propSetCurrentUser(null);
    if (propSetProfilePhoto) propSetProfilePhoto(null);
  };

  const openComments = (post) => {
    setSelectedPost(post);
    setShowCommentsModal(true);
  };

  const handleRemovePost = (postId) => {
    if (window.confirm('Are you sure you want to remove this post?')) {
      setPosts(prev => prev.filter(post => post.id !== postId));
    }
  };

  const handleBanUser = (username) => {
    if (window.confirm(`Are you sure you want to ban ${username}?`)) {
      alert(`${username} has been banned.`);
    }
  };

  const isModerator = currentUser && ['admin', 'moderator'].includes(currentUser.toLowerCase());

  const [savedPosts, setSavedPosts] = useState(new Set());
  const [sortBy, setSortBy] = useState('hot');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedSubreddit, setSelectedSubreddit] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const handleShare = async (post, event) => {
    const shareData = {
      title: post.title,
      text: post.content || post.title,
      url: `${window.location.origin}/post/${post.id}`
    };

    try {
      // Try native share API first (mobile devices)
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        return;
      }
    } catch (error) {
      console.log('Native share failed, falling back to clipboard');
    }

    // Fallback: copy to clipboard
    try {
      const shareText = `${post.title}\n\n${post.content || ''}\n\nShared from Reddit Clone: ${window.location.origin}/post/${post.id}`;
      await navigator.clipboard.writeText(shareText);
      
      // Show success message
      if (event && event.target) {
        const originalText = event.target.textContent;
        event.target.textContent = 'Copied!';
        event.target.style.background = '#28a745';
        event.target.style.color = 'white';
        
        setTimeout(() => {
          event.target.textContent = originalText;
          event.target.style.background = '';
          event.target.style.color = '';
        }, 2000);
      } else {
        alert('Post link copied to clipboard!');
      }
      
    } catch (error) {
      // Final fallback: show share options
      showShareModal(post);
    }
  };

  const showShareModal = (post) => {
    const shareUrl = `${window.location.origin}/post/${post.id}`;
    const shareText = `${post.title}\n\n${post.content || ''}\n\nShared from Reddit Clone`;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    `;
    
    modal.innerHTML = `
      <div style="
        background: white;
        padding: 2rem;
        border-radius: 8px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      ">
        <h3 style="margin: 0 0 1rem 0; color: #333;">Share Post</h3>
        <p style="margin: 0 0 1rem 0; color: #666; font-size: 0.9rem;">Copy the link below to share this post:</p>
        <input 
          type="text" 
          value="${shareUrl}" 
          readonly 
          style="
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-bottom: 1rem;
            font-size: 0.9rem;
          "
        />
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
          <button 
            onclick="this.clipboard.writeText('${shareUrl}').then(() => { this.textContent = 'Copied!'; setTimeout(() => this.textContent = 'Copy Link', 1000); })"
            style="
              padding: 0.5rem 1rem;
              background: #0079d3;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            Copy Link
          </button>
          <button 
            onclick="this.closest('.share-modal').remove()"
            style="
              padding: 0.5rem 1rem;
              background: #6c757d;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            Close
          </button>
        </div>
      </div>
    `;
    
    modal.className = 'share-modal';
    document.body.appendChild(modal);
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  };

  const handleSave = (postId) => {
    if (savedPosts.has(postId)) {
      setSavedPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    } else {
      setSavedPosts(prev => new Set(prev).add(postId));
    }
  };

  const handleReport = (post) => {
    const reason = prompt(`Report "${post.title}"\n\nReason:`);
    if (reason) {
      alert(`Post reported: "${reason}"`);
    }
  };

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
    if (propSetPosts) propSetPosts(prev => prev.map(post => 
      post.id === editingPost.id ? editingPost : post
    ));
    setShowEditModal(false);
    setEditingPost(null);
  };

  const handleDeleteOwnPost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== postId));
      if (propSetPosts) propSetPosts(prev => prev.filter(post => post.id !== postId));
    }
  };

  const isOwnPost = (post) => {
    return currentUser && post.author === currentUser;
  };

  // Add event listeners for navigation buttons
  React.useEffect(() => {
    const handleOpenLoginModal = () => setShowLoginModal(true);
    const handleOpenSignupModal = () => setShowSignupModal(true);
    const handleOpenCreatePostModal = () => setShowCreatePostModal(true);
    const handleSearchPosts = (event) => {
      const searchQuery = event.detail;
      setSearchQuery(searchQuery);
      setIsSearching(searchQuery.trim().length > 0);
      
      if (searchQuery.trim()) {
        const filtered = posts.filter(post => 
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.subreddit.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPosts(filtered);
      } else {
        setFilteredPosts([]);
      }
    };

    window.addEventListener('openLoginModal', handleOpenLoginModal);
    window.addEventListener('openSignupModal', handleOpenSignupModal);
    window.addEventListener('openCreatePostModal', handleOpenCreatePostModal);
    window.addEventListener('searchPosts', handleSearchPosts);

    return () => {
      window.removeEventListener('openLoginModal', handleOpenLoginModal);
      window.removeEventListener('openSignupModal', handleOpenSignupModal);
      window.removeEventListener('openCreatePostModal', handleOpenCreatePostModal);
      window.removeEventListener('searchPosts', handleSearchPosts);
    };
  }, [posts]);

  const handleSubredditClick = (subreddit) => {
    setSelectedSubreddit(subreddit);
  };

  const getDisplayPosts = () => {
    let displayPosts = posts;
    
    // If searching, show filtered results
    if (isSearching && filteredPosts.length > 0) {
      displayPosts = filteredPosts;
    } else if (isSearching && filteredPosts.length === 0) {
      // If searching but no results, return empty array
      return [];
    }
    
    // Apply subreddit filter if not searching
    if (!isSearching && selectedSubreddit !== 'all') {
      displayPosts = displayPosts.filter(post => post.subreddit === selectedSubreddit);
    }
    
    return displayPosts;
  };

  const handleVote = (postId, type) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        let newUpvotes = post.upvotes;
        
        if (type === 'upvote') {
          if (upvotedPosts.has(postId)) {
            // Remove upvote
            newUpvotes = post.upvotes - 1;
            setUpvotedPosts(prev => {
              const newSet = new Set(prev);
              newSet.delete(postId);
              return newSet;
            });
          } else {
            // Add upvote
            newUpvotes = post.upvotes + 1;
            setUpvotedPosts(prev => new Set(prev).add(postId));
            setDownvotedPosts(prev => {
              const newSet = new Set(prev);
              newSet.delete(postId);
              return newSet;
            });
          }
        } else {
          if (downvotedPosts.has(postId)) {
            // Remove downvote
            newUpvotes = post.upvotes + 1;
            setDownvotedPosts(prev => {
              const newSet = new Set(prev);
              newSet.delete(postId);
              return newSet;
            });
          } else {
            // Add downvote
            newUpvotes = post.upvotes - 1;
            setDownvotedPosts(prev => new Set(prev).add(postId));
            setUpvotedPosts(prev => {
              const newSet = new Set(prev);
              newSet.delete(postId);
              return newSet;
            });
          }
        }
        
        return { ...post, upvotes: newUpvotes };
      }
      return post;
    }));
    if (propSetPosts) propSetPosts(prev => prev.map(post => {
      if (post.id === postId) {
        let newUpvotes = post.upvotes;
        
        if (type === 'upvote') {
          if (upvotedPosts.has(postId)) {
            newUpvotes = post.upvotes - 1;
          } else {
            newUpvotes = post.upvotes + 1;
          }
        } else {
          if (downvotedPosts.has(postId)) {
            newUpvotes = post.upvotes + 1;
          } else {
            newUpvotes = post.upvotes - 1;
          }
        }
        
        return { ...post, upvotes: newUpvotes };
      }
      return post;
    }));
  };


  return (
    <div className="reddit-app">

      {/* Main Content */}
      <div className="reddit-content">
        {/* Sidebar */}
        <aside className="reddit-sidebar">
          <div className="sidebar-section">
            <h3>Popular Communities</h3>
            <div className="community-list">
              <div 
                className={`community-item ${selectedSubreddit === 'all' ? 'active' : ''}`}
                onClick={() => handleSubredditClick('all')}
              >
                <span className="community-icon">⭐</span>
                <span className="community-name">All Posts</span>
                <span className="member-count">All</span>
              </div>
              <div 
                className={`community-item ${selectedSubreddit === 'r/programming' ? 'active' : ''}`}
                onClick={() => handleSubredditClick('r/programming')}
              >
                <span className="community-icon">💻</span>
                <span className="community-name">r/programming</span>
                <span className="member-count">4.1m</span>
              </div>
              <div 
                className={`community-item ${selectedSubreddit === 'r/reactjs' ? 'active' : ''}`}
                onClick={() => handleSubredditClick('r/reactjs')}
              >
                <span className="community-icon">⚛️</span>
                <span className="community-name">r/reactjs</span>
                <span className="member-count">234k</span>
              </div>
              <div 
                className={`community-item ${selectedSubreddit === 'r/webdev' ? 'active' : ''}`}
                onClick={() => handleSubredditClick('r/webdev')}
              >
                <span className="community-icon">🌐</span>
                <span className="community-name">r/webdev</span>
                <span className="member-count">1.2m</span>
              </div>
              <div 
                className={`community-item ${selectedSubreddit === 'r/learnprogramming' ? 'active' : ''}`}
                onClick={() => handleSubredditClick('r/learnprogramming')}
              >
                <span className="community-icon">📚</span>
                <span className="community-name">r/learnprogramming</span>
                <span className="member-count">3.8m</span>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Your Communities</h3>
            <div className="user-communities">
              <div className="community-item">
                <span className="community-icon">⭐</span>
                <span className="community-name">r/popular</span>
                <span className="member-count">All</span>
              </div>
              <div className="community-item">
                <span className="community-icon">🔥</span>
                <span className="community-name">r/trending</span>
                <span className="member-count">Hot</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="reddit-main">
          <div className="feed-header">
            <h2>Popular Posts</h2>
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
          
          {/* Search Results Indicator */}
          {isSearching && (
            <div className="search-results-header">
              <div className="search-info">
                <span className="search-query">Search results for: "{searchQuery}"</span>
                <span className="search-count">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} found
                </span>
              </div>
              <button 
                className="clear-search-btn"
                onClick={clearSearch}
              >
                ✕ Clear Search
              </button>
            </div>
          )}

          {/* No Results Message */}
          {isSearching && filteredPosts.length === 0 && (
            <div className="no-results">
              <h3>No posts found</h3>
              <p>Try searching for something else or <button onClick={clearSearch} className="clear-search-link">clear your search</button></p>
            </div>
          )}

          <div className="posts-container">
            {getDisplayPosts().map(post => (
              <div key={post.id} className="reddit-post">
                <div className="post-votes">
                  <button 
                    className={`vote-btn upvote ${upvotedPosts.has(post.id) ? 'active' : ''}`}
                    onClick={() => handleVote(post.id, 'upvote')}
                  >
                    ▲
                  </button>
                  <span className="vote-count">{post.upvotes}</span>
                  <button 
                    className={`vote-btn downvote ${downvotedPosts.has(post.id) ? 'active' : ''}`}
                    onClick={() => handleVote(post.id, 'downvote')}
                  >
                    ▼
                  </button>
                </div>
                
                <div className="post-content">
                  <div className="post-header">
                    <span 
                      className="subreddit"
                      onClick={() => handleSubredditClick(post.subreddit)}
                    >
                      {post.subreddit}
                    </span>
                    <span className="post-meta">Posted by {post.author} {post.time}</span>
                    {post.type === "image" && (
                      <span className="post-type-badge">🖼️ Image</span>
                    )}
                    {post.type === "text" && (
                      <span className="post-type-badge">📝 Text</span>
                    )}
                    {post.type === "link" && (
                      <span className="post-type-badge">🔗 Link</span>
                    )}
                  </div>
                  
                  <h3 className="post-title">{post.title}</h3>
                  
                  {post.type === "image" && post.image && (
                    <div className="post-image-container">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="post-image"
                        loading="lazy"
                      />
                    </div>
                  )}
                  {post.type === "video" && post.video && (
                    <div className="post-video-container">
                      <video 
                        src={post.video} 
                        controls
                        className="post-video"
                        preload="metadata"
                      />
                    </div>
                  )}
                  
                  {post.type === "link" && post.link && (
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
                  
                  {post.content && (
                    <div className="post-body">
                      <p>{post.content}</p>
                    </div>
                  )}
                  
                  <div className="post-actions">
                    <button 
                      className="action-btn"
                      onClick={() => openComments(post)}
                    >
                      💬 {comments[post.id]?.length || post.comments} Comments
                    </button>
                    <button 
                      className="action-btn"
                      onClick={(e) => handleShare(post, e)}
                    >
                      Share
                    </button>
                    <button 
                      className={`action-btn ${savedPosts.has(post.id) ? 'saved' : ''}`}
                      onClick={() => handleSave(post.id)}
                    >
                      {savedPosts.has(post.id) ? 'Saved' : 'Save'}
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => handleReport(post)}
                    >
                      Report
                    </button>
                    {isOwnPost(post) && (
                      <>
                        <button 
                          className="action-btn edit-btn"
                          onClick={() => handleEditPost(post)}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteOwnPost(post.id)}
                        >
                          🗑️ Delete
                        </button>
                      </>
                    )}
                    {isModerator && !isOwnPost(post) && (
                      <>
                        <button 
                          className="action-btn moderator-btn"
                          onClick={() => handleRemovePost(post.id)}
                        >
                          🗑️ Remove
                        </button>
                        <button 
                          className="action-btn moderator-btn"
                          onClick={() => handleBanUser(post.author)}
                        >
                          🚫 Ban User
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Create Post Modal */}
      {showCreatePostModal && (
        <div className="modal-overlay" onClick={() => setShowCreatePostModal(false)}>
          <div className="modal create-post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create a Post</h3>
              <button 
                className="modal-close"
                onClick={() => setShowCreatePostModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <form onSubmit={handleCreatePost} className="create-post-form">
                <div className="form-group">
                  <label>Subreddit</label>
                  <input 
                    type="text" 
                    placeholder="r/subreddit" 
                    value={newPost.subreddit}
                    onChange={(e) => setNewPost({...newPost, subreddit: e.target.value})}
                    required
                  />
                </div>
                  <div className="form-group">
                    <label>Post Type</label>
                    <select
                      value={newPost.type}
                      onChange={(e) => setNewPost({...newPost, type: e.target.value})}
                    >
                      <option value="text">📝 Text Post</option>
                      <option value="image">🖼️ Image Post</option>
                      <option value="video">🎥 Video Post</option>
                      <option value="link">🔗 Link Post</option>
                    </select>
                  </div>
                <div className="form-group">
                  <label>Title</label>
                  <input 
                    type="text" 
                    placeholder="An interesting title" 
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <textarea 
                    placeholder="Text (optional)"
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    rows="4"
                  />
                </div>
                {newPost.type === 'image' && (
                  <div className="form-group">
                    <label>Upload Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'image')}
                      className="file-input"
                      id="imageUpload"
                    />
                    <label htmlFor="imageUpload" className="file-input-label">
                      📷 Choose an image file
                    </label>
                    {newPost.image && (
                      <div className="preview-container">
                        <img src={newPost.image} alt="Preview" className="preview-image" />
                        <button 
                          type="button" 
                          onClick={() => setNewPost({...newPost, image: null})}
                          className="remove-preview-btn"
                        >
                          ✕ Remove
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {newPost.type === 'video' && (
                  <div className="form-group">
                    <label>Upload Video</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e, 'video')}
                      className="file-input"
                      id="videoUpload"
                    />
                    <label htmlFor="videoUpload" className="file-input-label">
                      🎥 Choose a video file
                    </label>
                    {newPost.video && (
                      <div className="preview-container">
                        <video src={newPost.video} controls className="preview-video" />
                        <button 
                          type="button" 
                          onClick={() => setNewPost({...newPost, video: null})}
                          className="remove-preview-btn"
                        >
                          ✕ Remove
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {newPost.type === 'link' && (
                  <div className="form-group">
                    <label>Link URL</label>
                    <input 
                      type="url" 
                      placeholder="https://example.com"
                      value={newPost.link || ''}
                      onChange={(e) => setNewPost({...newPost, link: e.target.value})}
                      required
                    />
                  </div>
                )}
                <button type="submit" className="btn btn-primary btn-full">
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showCommentsModal && selectedPost && (
        <div className="modal-overlay" onClick={() => setShowCommentsModal(false)}>
          <div className="modal comments-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Comments</h3>
              <button 
                className="modal-close"
                onClick={() => setShowCommentsModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="post-summary">
                <h4>{selectedPost.title}</h4>
                <p className="post-meta">{selectedPost.subreddit} • Posted by {selectedPost.author}</p>
              </div>
              
              <div className="comments-section">
                <h4>Comments ({comments[selectedPost.id]?.length || 0})</h4>
                
                <div className="add-comment">
                  <textarea 
                    placeholder="What are your thoughts?"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows="3"
                  />
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleAddComment(selectedPost.id)}
                  >
                    Comment
                  </button>
                </div>
                
                <div className="comments-list">
                  {(comments[selectedPost.id] || []).map(comment => (
                    <div key={comment.id} className="comment">
                      <div className="comment-header">
                        <span className="comment-author">{comment.author}</span>
                        <span className="comment-time">{comment.time}</span>
                      </div>
                      <div className="comment-content">
                        <p>{comment.content}</p>
                      </div>
                      <div className="comment-actions">
                        <button 
                          className={`comment-action like-btn ${likedComments.has(comment.id) ? 'liked' : ''}`}
                          onClick={() => handleLikeComment(selectedPost.id, comment.id)}
                        >
                          👍 {comment.upvotes}
                        </button>
                        <button 
                          className="comment-action reply-btn"
                          onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        >
                          Reply
                        </button>
                      </div>
                      
                      {/* Reply Form */}
                      {replyingTo === comment.id && (
                        <div className="reply-form">
                          <textarea
                            placeholder="Write a reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows="2"
                          />
                          <div className="reply-actions">
                            <button 
                              onClick={() => handleReply(selectedPost.id, comment.id)}
                              disabled={!replyText.trim()}
                            >
                              Reply
                            </button>
                            <button 
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText('');
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="replies">
                          {comment.replies.map(reply => (
                            <div key={reply.id} className="reply">
                              <div className="reply-header">
                                <span className="reply-author">{reply.author}</span>
                                <span className="reply-time">{reply.time}</span>
                              </div>
                              <p className="reply-content">{reply.content}</p>
                              <div className="reply-actions">
                                <button 
                                  className={`comment-action like-btn ${likedComments.has(reply.id) ? 'liked' : ''}`}
                                  onClick={() => handleLikeComment(selectedPost.id, reply.id)}
                                >
                                  👍 {reply.upvotes}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Log In</h3>
              <button 
                className="modal-close"
                onClick={() => setShowLoginModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <form onSubmit={handleLogin} className="auth-form">
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" name="username" placeholder="Enter your username" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="Enter your password" />
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="modal-overlay" onClick={() => setShowSignupModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Sign Up</h3>
              <button 
                className="modal-close"
                onClick={() => setShowSignupModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <form onSubmit={handleSignup} className="auth-form">
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" name="username" placeholder="Choose a username" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="Create a password" />
                </div>
                <div className="form-group">
                  <label>Profile Photo (Optional)</label>
                  <input 
                    type="file" 
                    name="profilePhoto" 
                    accept="image/*"
                    className="file-input"
                    id="profilePhoto"
                  />
                  <label htmlFor="profilePhoto" className="file-input-label">
                    📷 Choose a profile photo
                  </label>
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

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

export default Home;