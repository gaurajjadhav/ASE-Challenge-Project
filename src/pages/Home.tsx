import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';

const Home: React.FC = () => {
  const { movies, loading, error, fetchMovies } = useMovies();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies('popular');
  }, [fetchMovies]);

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  if (error) {
    return (
      <div className="container py-8">
        <div className="error">
          <h3 className="font-semibold mb-2">Error loading movies</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Movie Library
        </h1>
        <p className="text-gray-600 mb-6">
          Discover your next favorite movie from our extensive collection.
        </p>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Popular Movies
        </h2>
        {loading ? (
          <LoadingSpinner className="py-12" />
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
