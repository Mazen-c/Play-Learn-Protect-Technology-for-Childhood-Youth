# Play-Learn-Protect

An interactive educational gaming platform designed to make learning engaging and fun through gamified quizzes and challenges across multiple subjects.

## 🎯 Overview

Play-Learn-Protect is a React-based web application that transforms traditional learning into an interactive experience. Students can participate in subject-specific games, track their progress, compete on leaderboards, and earn achievements while learning core concepts in Mathematics, Chemistry, Physics, Coding, and Languages.

## ✨ Features

- **Multi-Subject Games**: Interactive quizzes in Mathematics, Chemistry, Physics, Coding, and Languages
- **Gamification**: Points system, progress tracking, and achievement cards
- **Leaderboards**: Compete with other learners and track rankings
- **Internationalization**: Multi-language support for global accessibility
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Progress**: Visual progress bars and statistics
- **Modern UI**: Clean, intuitive interface built with Material-UI and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 19.2.3 with TypeScript
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v3.4.0 with Material-UI
- **Internationalization**: i18next with react-i18next
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Yup validation
- **Animations**: Framer Motion
- **Build Tool**: Create React App with React Scripts 5.0.1

## 📁 Project Structure

```
play-learn-protect/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── assets/
├── src/
│   ├── Components/
│   │   ├── NavBar.tsx          # Navigation component
│   │   ├── DashBoard.tsx       # Main dashboard
│   │   ├── LeaderBoard.tsx     # Rankings display
│   │   ├── ProgressBar.tsx     # Progress visualization
│   │   ├── LanguageSwitcher.tsx # Language selection
│   │   └── AchievementCard.tsx # Achievement display
│   ├── Pages/
│   │   ├── Home.tsx            # Home page
│   │   ├── Game.tsx            # Generic game interface
│   │   └── games/
│   │       ├── Chemistry.tsx   # Chemistry quiz game
│   │       ├── Physics.tsx     # Physics quiz game
│   │       ├── Math.tsx        # Mathematics quiz game
│   │       ├── Coding.tsx      # Coding challenges
│   │       ├── Language.tsx    # Language learning game
│   │       └── GameInterface.ts # Game interface types
│   ├── i8ln/                   # Internationalization
│   │   └── i8ln.ts
│   ├── App.tsx                 # Main app component
│   ├── index.tsx               # App entry point
│   └── reportWebVitals.ts      # Performance monitoring
├── package.json
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd play-learn-protect
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
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### For Students
1. **Dashboard**: View your progress, achievements, and available games
2. **Select Subject**: Choose from Mathematics, Chemistry, Physics, Coding, or Languages
3. **Play Games**: Answer questions to earn points and track progress
4. **Leaderboards**: Compete with other learners and see rankings
5. **Language**: Switch between supported languages for accessibility

### Game Mechanics
- Each correct answer awards points
- Progress is tracked visually with progress bars
- Achievements are unlocked based on performance
- Leaderboards update in real-time

## 🧪 Testing

Run the test suite:

```bash
npm test
```

This launches the test runner in interactive watch mode.

## 🏗️ Building for Production

Create an optimized production build:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory, ready for deployment.

## 🌐 Internationalization

The app supports multiple languages through i18next. Language files are located in `src/i8ln/`. Currently supported languages:
- English
- Arabic (and extensible to others)

### Development Guidelines
- Use TypeScript for type safety
- Follow React best practices and hooks
- Maintain consistent code style
- Add tests for new features
- Update documentation as needed

## 📄 Scripts

- `npm start` - Start development server
- `npm test` - Run test suite
- `npm run build` - Create production build
- `npm run eject` - Eject from Create React App (irreversible)

## 🔧 Configuration

### Tailwind CSS
Customized in `tailwind.config.js` with content paths and theme extensions.

### PostCSS
Configured in `postcss.config.js` with Tailwind CSS and Autoprefixer plugins.

### TypeScript
Configured in `tsconfig.json` with React and modern ES features.

## 📊 Performance

The app includes web vitals monitoring through `reportWebVitals.ts` to track:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)
- Time to First Byte (TTFB)

## 🚀 Deployment

The app can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Build the app and deploy the `build/` folder contents.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- UI components from [Material-UI](https://mui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Internationalization with [i18next](https://www.i18next.com/)


**Happy Learning! 🎓**
