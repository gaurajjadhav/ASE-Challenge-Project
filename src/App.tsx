import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SearchResults from './pages/SearchResults';
import PopularMovies from './pages/PopularMovies';
import TopRatedMovies from './pages/TopRatedMovies';
import NowPlayingMovies from './pages/NowPlayingMovies';
import UpcomingMovies from './pages/UpcomingMovies';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <MovieProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/popular" element={<PopularMovies />} />
              <Route path="/top-rated" element={<TopRatedMovies />} />
              <Route path="/now-playing" element={<NowPlayingMovies />} />
              <Route path="/upcoming" element={<UpcomingMovies />} />
            </Routes>
          </main>
        </div>
      </MovieProvider>
    </ErrorBoundary>
  );
};

export default App;
