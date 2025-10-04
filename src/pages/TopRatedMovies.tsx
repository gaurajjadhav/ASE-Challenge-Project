import React, { useEffect, useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import FilterBar from '../components/FilterBar';

const TopRatedMovies: React.FC = () => {
  const { movies, loading, error, fetchMovies } = useMovies();
  const [filters, setFilters] = useState({
    genre: undefined as number | undefined,
    year: undefined as number | undefined,
    sortBy: 'popularity' as 'popularity' | 'release_date' | 'vote_average',
    sortOrder: 'desc' as 'asc' | 'desc',
  });

  useEffect(() => {
    fetchMovies('top-rated');
  }, [fetchMovies]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    // Note: Top rated movies endpoint doesn't support filters, 
    // but we keep this for consistency with other pages
  };

  if (error) {
    return (
      <div className="container py-8">
        <div className="error">
          <h3 className="font-semibold mb-2">Error loading top rated movies</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Top Rated Movies</h1>
      <p className="text-gray-600 mb-8">
        Explore the highest-rated movies according to TMDB users.
      </p>
      <FilterBar onFilterChange={handleFilterChange} />

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
  );
};

export default TopRatedMovies;
