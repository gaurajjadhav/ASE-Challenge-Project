import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();
  const { movies, loading, error, searchMovies } = useMovies();
  const [filters, setFilters] = useState({
    genre: undefined as number | undefined,
    year: undefined as number | undefined,
    sortBy: 'popularity' as 'popularity' | 'release_date' | 'vote_average',
    sortOrder: 'desc' as 'asc' | 'desc',
  });

  useEffect(() => {
    if (query) {
      searchMovies({
        query,
        ...filters,
      });
    }
  }, [query, filters, searchMovies]);

  const handleSearch = (searchQuery: string) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('q', searchQuery);
    navigate(`/search?${newSearchParams.toString()}`);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Search Results
        </h1>
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search for movies..."
          className="mb-4"
        />
        <FilterBar onFilterChange={handleFilterChange} />
      </div>

      {query && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Results for "{query}"
          </h2>
          {loading ? (
            <LoadingSpinner className="py-12" />
          ) : error ? (
            <div className="error">
              <h3 className="font-semibold mb-2">Error searching movies</h3>
              <p>{error}</p>
            </div>
          ) : movies.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No movies found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      )}

      {!query && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Start your search
          </h3>
          <p className="text-gray-600">
            Enter a movie title in the search bar above to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
