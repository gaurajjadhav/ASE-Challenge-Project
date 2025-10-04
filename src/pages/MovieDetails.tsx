import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovieDetails } from '../hooks/useMovieDetails';
import LoadingSpinner from '../components/LoadingSpinner';
import { getImageUrl, formatDate, formatCurrency, formatRuntime } from '../utils/helpers';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id ? parseInt(id) : null;
  const { movie, loading, error } = useMovieDetails(movieId);

  if (loading) {
    return (
      <div className="container py-8">
        <LoadingSpinner className="py-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="error">
          <h3 className="font-semibold mb-2">Error loading movie details</h3>
          <p>{error}</p>
          <Link to="/" className="btn btn-primary mt-4">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Movie not found
          </h2>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'BACKDROP');
  const posterUrl = getImageUrl(movie.poster_path);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <h1 className="text-4xl font-bold text-white mb-2">
              {movie.title}
            </h1>
            <p className="text-gray-300 text-lg">
              {movie.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-gray-600">/ 10</span>
                </div>
                <div className="text-gray-600">
                  {movie.vote_count.toLocaleString()} votes
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Overview</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {movie.overview}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Release Date</h4>
                    <p className="text-gray-700">
                      {formatDate(movie.release_date)}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Runtime</h4>
                    <p className="text-gray-700">
                      {formatRuntime(movie.runtime)}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Status</h4>
                    <p className="text-gray-700">{movie.status}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Budget</h4>
                    <p className="text-gray-700">
                      {formatCurrency(movie.budget)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Genres</h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                {movie.production_companies.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Production Companies</h4>
                    <div className="flex flex-wrap gap-2">
                      {movie.production_companies.map((company) => (
                        <span
                          key={company.id}
                          className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                        >
                          {company.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link to="/" className="btn btn-secondary">
                  ← Back to Movies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
