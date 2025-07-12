# AI News Aggregator Frontend

A modern, responsive React frontend for an AI-powered news aggregator that fetches news from GNews API and provides AI-generated summaries using Grok AI.

## 🌟 Features

- **Modern UI/UX**: Clean, sleek design with the "Neo Breeze" color scheme
- **Authentication**: Login/signup system with admin user support
- **Personalized Feed**: News articles with images and descriptions
- **AI Summaries**: AI-generated summaries for each article
- **Category Preferences**: User-selectable news categories
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Search & Filter**: Search articles and filter by categories
- **Settings Management**: Change password and update preferences
- **Admin Access**: Special admin user with full access

## 🎨 Design System

### Neo Breeze Color Scheme
- **Primary**: #4F46E5 (Indigo)
- **Accent**: #22D3EE (Cyan)
- **Background**: #F9FAFB (Off-white)
- **Dark Text**: #111827 (Very dark gray)
- **Light Text**: #6B7280 (Cool gray)
- **Cards**: #FFFFFF (Pure white)
- **Borders**: #E5E7EB (Light gray)

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-news-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 👤 Admin Access

The application includes a pre-configured admin user:
- **Email**: vibhu00shukla@gmail.com
- **Password**: vibhu

The admin user has access to all features and can view all news categories.

## 📱 Pages & Features

### 1. Login/Signup Pages
- Modern authentication forms
- Password visibility toggle
- Form validation
- Admin login support

### 2. News Feed
- Responsive grid layout
- Article cards with images
- Search functionality
- Category filtering
- User menu with settings/logout

### 3. Article Detail
- Full article content
- AI-generated summary
- Share functionality
- Bookmark feature
- Responsive reading experience

### 4. Settings
- Account information display
- Category preferences management
- Password change functionality
- Logout option

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Lucide React**: Beautiful icons
- **CSS3**: Custom styling with CSS variables
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
src/
├── components/
│   ├── Login.js          # Login component
│   ├── Login.css         # Login styles
│   ├── Signup.js         # Signup component
│   ├── Signup.css        # Signup styles
│   ├── Feed.js           # News feed component
│   ├── Feed.css          # Feed styles
│   ├── ArticleDetail.js  # Article detail component
│   ├── ArticleDetail.css # Article detail styles
│   ├── Settings.js       # Settings component
│   └── Settings.css      # Settings styles
├── App.js                # Main app component
├── App.css               # App styles
├── index.js              # Entry point
└── index.css             # Global styles
```

## 🔧 Configuration

### Backend Integration
To connect with your backend API, update the API endpoints in the components:

1. **Feed Component**: Replace mock data with API calls
2. **Article Detail**: Connect to your article API
3. **Authentication**: Integrate with your auth endpoints
4. **Settings**: Connect preference and password update APIs

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your_backend_api_url
REACT_APP_GNEWS_API_KEY=your_gnews_api_key
REACT_APP_GROK_API_KEY=your_grok_api_key
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🎯 Key Features

### Modern UI Elements
- Smooth animations and transitions
- Hover effects and micro-interactions
- Consistent spacing and typography
- Card-based layouts
- Modern form controls

### User Experience
- Intuitive navigation
- Clear visual hierarchy
- Loading states and feedback
- Error handling
- Accessibility features

### Performance
- Optimized images
- Efficient component rendering
- Minimal bundle size
- Fast loading times

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **AWS S3**: Upload the `build` folder
- **Firebase**: Use Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

**Built with ❤️ using React and modern web technologies** 