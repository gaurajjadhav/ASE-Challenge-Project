import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/movie';
import { getImageUrl, formatDate, formatRating, truncateText } from '../utils/helpers';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const posterUrl = getImageUrl(movie.poster_path);
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  return (
    <div className="card">
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-80 object-cover"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm font-medium">
            {formatRating(movie.vote_average)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {releaseYear}
          </p>
          <p className="text-sm text-gray-700 line-clamp-3">
            {truncateText(movie.overview, 120)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
