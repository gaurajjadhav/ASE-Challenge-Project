# Movie Library 🎬

A modern, responsive web application for browsing and discovering movies using The Movie Database (TMDB) API. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Movie Discovery**: Browse popular, top-rated, now playing, and upcoming movies
- **Advanced Search**: Search for movies with real-time results
- **Smart Filtering**: Filter by genre, year, rating, and sort options
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Real-time Data**: Live movie data from TMDB API
- **Type Safety**: Full TypeScript implementation for better development experience

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS 3.x
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Testing**: Vitest, React Testing Library
- **Icons**: React Icons
- **Date Handling**: date-fns

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **TMDB API Key** (free at [themoviedb.org](https://www.themoviedb.org/settings/api))

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd MovieLibrary
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Key

#### Option A: Environment File (Recommended)
1. Create a `.env` file in the project root
2. Add your TMDB API key:
```env
VITE_TMDB_API_KEY=your_actual_tmdb_api_key_here
```

#### Option B: PowerShell Environment Variable
```powershell
$env:VITE_TMDB_API_KEY="your_actual_tmdb_api_key_here"
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Tests with UI
```bash
npm run test:ui
```

## 📱 Usage

### Navigation
- **Home**: Browse popular movies and search
- **Popular**: Most popular movies currently
- **Top Rated**: Highest-rated movies
- **Now Playing**: Movies currently in theaters
- **Upcoming**: Movies coming soon
- **Search**: Advanced search with filters

### Search & Filtering
1. Use the search bar to find specific movies
2. Apply filters by:
   - **Genre**: Action, Comedy, Drama, etc.
   - **Year**: Release year (2005-2025)
   - **Sort By**: Popularity, Release Date, Rating
   - **Order**: Ascending or Descending

### Movie Details
- Click on any movie card to view detailed information
- See ratings, release dates, and descriptions

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx
│   ├── FilterBar.tsx
│   ├── Header.tsx
│   ├── LoadingSpinner.tsx
│   ├── MovieCard.tsx
│   └── SearchBar.tsx
├── context/            # React Context for state management
│   └── MovieContext.tsx
├── hooks/              # Custom React hooks
│   ├── useMovieDetails.ts
│   └── useMovies.ts
├── pages/              # Page components
│   ├── Home.tsx
│   ├── MovieDetails.tsx
│   ├── SearchResults.tsx
│   ├── PopularMovies.tsx
│   ├── TopRatedMovies.tsx
│   ├── NowPlayingMovies.tsx
│   └── UpcomingMovies.tsx
├── services/           # API services
│   └── api.ts
├── types/              # TypeScript type definitions
│   └── movie.ts
├── utils/              # Utility functions
│   ├── constants.ts
│   └── helpers.ts
└── App.tsx            # Main application component
```

## 🎯 Design Choices & Assumptions

### Architecture Decisions
1. **React Context over Redux**: Chose React Context for simpler state management given the moderate complexity
2. **Tailwind CSS**: Selected for rapid development and consistent design system
3. **TypeScript**: Implemented for type safety and better developer experience
4. **Vite**: Chosen for faster development builds and better performance

### API Integration
1. **TMDB API**: Selected for comprehensive movie data and free access
2. **Axios**: Used for HTTP requests with built-in error handling
3. **Environment Variables**: API key stored securely in environment variables

### User Experience
1. **Responsive Design**: Mobile-first approach with progressive enhancement
2. **Loading States**: Implemented loading spinners for better user feedback
3. **Error Handling**: Comprehensive error boundaries and user-friendly error messages
4. **Accessibility**: Semantic HTML and proper ARIA labels

### Performance Optimizations
1. **Lazy Loading**: Images load only when needed
2. **Code Splitting**: Route-based code splitting for faster initial loads
3. **Memoization**: React.memo() for expensive components
4. **Efficient Re-renders**: Optimized state updates and context usage

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint         # Run ESLint
```

## 🌐 API Endpoints Used

- **Popular Movies**: `/movie/popular`
- **Top Rated**: `/movie/top_rated`
- **Now Playing**: `/movie/now_playing`
- **Upcoming**: `/movie/upcoming`
- **Search**: `/search/movie`
- **Movie Details**: `/movie/{id}`
- **Genres**: `/genre/movie/list`

## 🚀 Future Enhancements

- [ ] User authentication and favorites
- [ ] Movie recommendations based on viewing history
- [ ] Advanced filtering (rating range, runtime, etc.)
- [ ] Infinite scroll for better performance
- [ ] Dark mode toggle
- [ ] Movie trailers integration
- [ ] Reviews and ratings system
- [ ] Watchlist functionality
- [ ] Social sharing features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [React](https://reactjs.org/) for the amazing frontend framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing utilities

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/movie-library/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Happy Movie Browsing! 🍿**