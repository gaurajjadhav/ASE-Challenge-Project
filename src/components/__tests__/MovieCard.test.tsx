import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieCard from '../MovieCard';
import { Movie } from '../../types/movie';

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'This is a test movie overview',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  genre_ids: [1, 2],
  adult: false,
  original_language: 'en',
  original_title: 'Test Movie',
  popularity: 100,
  video: false,
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('MovieCard', () => {
  it('renders movie information correctly', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('This is a test movie overview')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('renders with correct poster image', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    
    const image = screen.getByAltText('Test Movie');
    expect(image).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/test-poster.jpg');
  });

  it('renders placeholder image when poster_path is null', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    renderWithRouter(<MovieCard movie={movieWithoutPoster} />);
    
    const image = screen.getByAltText('Test Movie');
    expect(image).toHaveAttribute('src', '/placeholder-movie.jpg');
  });

  it('renders N/A when release_date is empty', () => {
    const movieWithoutDate = { ...mockMovie, release_date: '' };
    renderWithRouter(<MovieCard movie={movieWithoutDate} />);
    
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('links to correct movie details page', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/movie/1');
  });
});
