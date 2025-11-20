# Student Dashboard Frontend

A modern, responsive student dashboard application built with React, TypeScript, and Material-UI. Features full authentication, internationalization (English/Arabic), and comprehensive student management capabilities.

## 🚀 Live Demo

**Frontend:** [https://student-dashboard-frontend-seven.vercel.app](https://student-dashboard-frontend-seven.vercel.app)  
**Backend API:** [https://student-app-backend-sigma.vercel.app](https://student-app-backend-sigma.vercel.app)

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT token-based authentication with automatic refresh
- Password reset flow (forgot password & reset with token)
- Protected routes with RequireAuth HOC

### 🌍 Internationalization
- Full support for English and Arabic languages
- RTL (Right-to-Left) layout for Arabic
- LTR (Left-to-Right) layout for English
- Language persistence using localStorage
- Floating language switcher on all pages

### 📱 Responsive Design
- Desktop: Permanent sidebar navigation
- Mobile: Collapsible drawer with hamburger menu (3-line icon)
- Sidebar position adapts to language direction (right for Arabic, left for English)
- Fully responsive components using Material-UI breakpoints

### 📊 Dashboard Features
- Welcome page for unauthenticated users
- Main dashboard with overview of quizzes and announcements
- Quizzes management page (protected)
- Announcements feed (protected)
- Settings page
- 404 Not Found page

### 🎨 UI/UX
- Material-UI v7 components
- Cairo font for enhanced Arabic readability
- Custom theme with direction-based styling
- Loading states and error handling
- Smooth transitions and animations

## 🛠️ Tech Stack

- **React** 19.2.0 - UI library
- **TypeScript** 4.9.5 - Type safety
- **Material-UI** v7.3.5 - Component library
- **Redux Toolkit** 2.10.1 - State management
- **React Router** v7.9.6 - Navigation
- **i18next** 23.11.5 - Internationalization
- **Axios** 1.13.2 - HTTP client
- **date-fns** 4.1.0 - Date formatting

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yousseffninja/student-dashboard-frontend.git
cd student-dashboard-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=https://student-app-backend-sigma.vercel.app
```

4. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🚀 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
Ejects from Create React App (one-way operation)

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── DashboardLayout.tsx    # Main layout with sidebar
│   │   └── Sidebar.tsx             # Navigation sidebar
│   ├── LanguageSwitcher.tsx        # Language toggle component
│   └── RequireAuth.tsx             # Route protection HOC
├── pages/
│   ├── WelcomePage.tsx             # Landing page
│   ├── LoginPage.tsx               # Login form
│   ├── RegisterPage.tsx            # Registration form
│   ├── ForgotPasswordPage.tsx      # Request password reset
│   ├── ResetPasswordPage.tsx       # Reset password with token
│   ├── DashboardPage.tsx           # Main dashboard
│   ├── QuizzesPage.tsx             # Quizzes listing (protected)
│   ├── AnnouncementsPage.tsx       # Announcements feed (protected)
│   ├── SettingsPage.tsx            # Settings page
│   └── NotFoundPage.tsx            # 404 error page
├── store/
│   ├── store.ts                    # Redux store configuration
│   ├── hooks.ts                    # Typed Redux hooks
│   └── slices/
│       ├── authSlice.ts            # Authentication state
│       ├── quizSlice.ts            # Quiz CRUD operations
│       └── announcementSlice.ts    # Announcements CRUD
├── services/
│   └── api.ts                      # Axios instance with interceptors
├── i18n/
│   ├── config.ts                   # i18next configuration
│   └── locales/
│       ├── en.json                 # English translations
│       └── ar.json                 # Arabic translations
├── theme/
│   └── theme.ts                    # MUI theme with RTL/LTR support
├── types/
│   └── index.ts                    # TypeScript type definitions
├── App.tsx                         # Root component with routing
└── index.tsx                       # App entry point
```

## 🔑 Key Features Implementation

### Token Refresh Mechanism
The app uses JWT access and refresh tokens. When an access token expires (401 error), the API interceptor automatically:
1. Queues the failed request
2. Requests a new access token using the refresh token
3. Updates the stored access token
4. Retries all queued requests
5. Handles refresh token expiration by redirecting to login

### Language Switching
Language changes trigger:
- i18next language update
- Document direction change (RTL/LTR)
- Theme regeneration with new direction
- LocalStorage persistence

### Route Protection
Protected routes use the `RequireAuth` HOC which:
- Checks authentication status from Redux
- Redirects to login if unauthenticated
- Preserves the intended destination
- Redirects back after successful login

## 🌐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `https://student-app-backend-sigma.vercel.app` |

## 🚀 Deployment

The app is configured for Vercel deployment:

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push to master

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Git Workflow

The project uses feature branches for organized development:

- `feature/project-setup` - Initial dependencies and configuration
- `feature/types-theme` - TypeScript types and MUI theme
- `feature/i18n` - Internationalization setup
- `feature/api-services` - Axios API service with token refresh
- `feature/redux-store` - Redux store with slices
- `feature/authentication` - Authentication pages and password reset
- `feature/dashboard-pages` - Dashboard and content pages
- `feature/dashboard-layout` - Responsive layout with sidebar
- `feature/components` - Shared components (LanguageSwitcher, RequireAuth)
- `feature/routing` - Application routing configuration

## 📄 License

This project is part of the Anyware Software Fullstack Challenge.

## 👤 Author

**Youssef Ninja**
- GitHub: [@yousseffninja](https://github.com/yousseffninja)

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- UI components from [Material-UI](https://mui.com/)
- Icons from [Material Icons](https://fonts.google.com/icons)
- Font: [Cairo](https://fonts.google.com/specimen/Cairo) by Google Fonts
