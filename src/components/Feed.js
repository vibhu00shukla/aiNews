import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings, LogOut, User, Search, Filter, Bookmark } from 'lucide-react';
import './Feed.css';

// Mock news data - replace with actual API calls
export const mockNewsData = [
  {
    id: 1,
    title: "AI Breakthrough: New Model Achieves Human-Level Understanding",
    description: "Researchers have developed a new artificial intelligence model that demonstrates unprecedented capabilities in natural language understanding and reasoning.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    category: "technology",
    publishedAt: "2024-01-15T10:30:00Z",
    source: "Tech News Daily"
  },
  {
    id: 2,
    title: "Global Markets React to New Economic Policies",
    description: "Financial markets worldwide are responding to recent policy changes, with significant movements in major indices and currency pairs.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    category: "business",
    publishedAt: "2024-01-15T09:15:00Z",
    source: "Business Insider"
  },
  {
    id: 3,
    title: "Revolutionary Cancer Treatment Shows Promising Results",
    description: "A new immunotherapy treatment has shown remarkable success in early clinical trials, offering hope for patients with previously untreatable cancers.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
    category: "health",
    publishedAt: "2024-01-15T08:45:00Z",
    source: "Medical Research Today"
  },
  {
    id: 4,
    title: "SpaceX Successfully Launches New Satellite Constellation",
    description: "SpaceX has successfully deployed another batch of satellites as part of their global internet coverage initiative.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=250&fit=crop",
    category: "science",
    publishedAt: "2024-01-15T07:20:00Z",
    source: "Space News"
  },
  {
    id: 5,
    title: "Major Film Studio Announces Blockbuster Lineup for 2024",
    description: "A leading film studio has revealed an impressive slate of upcoming releases, including several highly anticipated sequels and original productions.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=250&fit=crop",
    category: "entertainment",
    publishedAt: "2024-01-15T06:30:00Z",
    source: "Entertainment Weekly"
  },
  {
    id: 6,
    title: "Championship Finals Set After Dramatic Semi-Final Matches",
    description: "The championship finals are now set after a series of thrilling semi-final matches that kept fans on the edge of their seats.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    category: "sports",
    publishedAt: "2024-01-15T05:15:00Z",
    source: "Sports Central"
  }
];

const Feed = ({ user, onLogout }) => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  // Load last selected filter from localStorage, else default
  const getInitialCategory = () => {
    const saved = localStorage.getItem('selectedCategory');
    if (saved) return saved;
    if (user.preferences && user.preferences.length > 0) return 'preferences';
    return 'all';
  };
  const [selectedCategory, setSelectedCategory] = useState(getInitialCategory());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem(`bookmarks_${user.email}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNews(mockNewsData);
      setFilteredNews(mockNewsData);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = news;

    if (selectedCategory === 'bookmarks') {
      filtered = news.filter(article => bookmarks.includes(article.id));
    } else if (selectedCategory === 'preferences' && user.preferences && user.preferences.length > 0) {
      filtered = news.filter(article => user.preferences.includes(article.category));
    } else if (selectedCategory !== 'all') {
      filtered = news.filter(article => article.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNews(filtered);
  }, [news, searchTerm, selectedCategory, user.preferences, bookmarks]);

  // Save selected filter to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`bookmarks_${user.email}` , JSON.stringify(bookmarks));
  }, [bookmarks, user.email]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const categories = [
    { value: 'bookmarks', label: 'Bookmarks' },
    { value: 'preferences', label: 'Your Preferences' },
    { value: 'all', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'science', label: 'Science' },
    { value: 'health', label: 'Health' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'sports', label: 'Sports' }
  ];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Expose bookmarks and setBookmarks for ArticleDetail
  window.__setBookmarks = setBookmarks;
  window.__bookmarks = bookmarks;

  if (isLoading) {
    return (
      <div className="feed-loading">
        <div className="loading-spinner"></div>
        <p>Loading your personalized news...</p>
      </div>
    );
  }

  return (
    <div className="feed-container">
      {/* Header */}
      <header className="feed-header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <h1 className="logo">AI News</h1>
              <p className="welcome-text">Welcome back, {user.name}!</p>
            </div>
            
            <div className="header-right">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="     Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <button
                className={`header-action-btn${selectedCategory === 'bookmarks' ? ' active' : ''}`}
                title="Bookmarks"
                onClick={() => setSelectedCategory('bookmarks')}
                style={{ fontWeight: selectedCategory === 'bookmarks' ? 'bold' : 'normal' }}
              >
                <Bookmark className="action-icon" />
              </button>
              
              <div className="header-actions">
                <Link to="/settings" className="header-action-btn" title="Settings">
                  <Settings className="action-icon" />
                </Link>
                
                <button
                  onClick={onLogout}
                  className="header-action-btn"
                  title="Logout"
                >
                  <LogOut className="action-icon" />
                </button>
                
                <div className="user-menu-container">
                  <button
                    className="user-menu-button"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <User className="user-icon" />
                    <span>{user.name}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="user-menu">
                      <Link to="/settings" className="menu-item">
                        <Settings className="menu-icon" />
                        Settings
                      </Link>
                      <button onClick={onLogout} className="menu-item">
                        <LogOut className="menu-icon" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="feed-main">
        <div className="container">
          {/* Category Filter */}
          <div className="category-filter">
            <Filter className="filter-icon" />
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="category-select"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* News Grid */}
          <div className="news-grid">
            {filteredNews.length === 0 ? (
              <div className="no-results">
                <p>No news articles found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredNews.map(article => (
                <Link
                  key={article.id}
                  to={`/article/${article.id}`}
                  className="news-card"
                >
                  <div className="news-image">
                    <img src={article.image} alt={article.title} />
                    <div className="news-category">{article.category}</div>
                  </div>
                  <div className="news-content">
                    <h3 className="news-title">{article.title}</h3>
                    <p className="news-description">{article.description}</p>
                    <div className="news-meta">
                      <span className="news-source">{article.source}</span>
                      <span className="news-date">{formatDate(article.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feed; 