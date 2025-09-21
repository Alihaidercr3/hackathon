# Frontend Structure Overview

This is a complete React frontend structure with modern organization and reusable components.

## 📁 Project Structure

```
frontend/src/
├── components/           # Reusable UI components
│   ├── layout/         # Layout components (Header, Footer, Sidebar, MainLayout)
│   ├── ui/             # Basic UI components (Button, Card, Modal)
│   └── index.js        # Component exports
├── pages/              # Page components
│   ├── Home.jsx        # Home page
│   ├── About.jsx       # About page
│   ├── Contact.jsx     # Contact page
│   └── NotFound.jsx    # 404 page
├── hooks/              # Custom React hooks
│   └── index.js        # useLocalStorage, useModal, useApi, useForm, etc.
├── utils/              # Utility functions
│   └── index.js        # formatDate, formatCurrency, validation, etc.
├── services/           # API services
│   └── api.js          # API request functions
├── context/            # React Context for state management
│   └── AppContext.js   # Global app state
├── styles/             # Global styles (if needed)
├── assets/             # Static assets
│   └── images/         # Image files
├── App.jsx             # Main app component with routing
└── main.jsx            # App entry point
```

## 🚀 Features Included

### Layout Components
- **Header**: Navigation bar with logo and menu
- **Footer**: Site footer with links and social media
- **Sidebar**: Collapsible sidebar navigation
- **MainLayout**: Main layout wrapper combining all layout components

### UI Components
- **Button**: Reusable button with multiple variants (primary, secondary, success, danger, warning, outline)
- **Card**: Content card with image, title, subtitle, and actions
- **Modal**: Modal dialog with overlay and close functionality

### Pages
- **Home**: Landing page with hero section and features
- **About**: About page with company information
- **Contact**: Contact form and information
- **NotFound**: 404 error page

### Custom Hooks
- **useLocalStorage**: Manage localStorage with React state
- **useModal**: Modal state management
- **useApi**: API call management with loading and error states
- **useForm**: Form handling with validation
- **useDebounce**: Debounce values for search/input

### Utilities
- Date formatting, currency formatting
- Email/URL validation
- Text manipulation (capitalize, truncate)
- File handling utilities
- Deep cloning and object merging

### Services
- **API Service**: Generic HTTP request functions (GET, POST, PUT, DELETE)
- **Auth Service**: Authentication related API calls
- **File Service**: File upload and management

### Context
- **AppContext**: Global state management for user, theme, sidebar, notifications

## 🛠️ Technologies Used

- **React 19** - Frontend framework
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern CSS features

## 📦 Installation & Usage

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## 🎨 Styling Approach

- Component-scoped CSS files
- Modern CSS with flexbox and grid
- Responsive design with mobile-first approach
- CSS custom properties for theming
- Hover effects and smooth transitions

## 🔧 Customization

- Modify colors in CSS files
- Add new components in appropriate folders
- Extend hooks and utilities as needed
- Update API endpoints in services
- Customize layout components for your brand

This structure provides a solid foundation for any React application with room for growth and customization.
