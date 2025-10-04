import { renderHook, waitFor } from '@testing-library/react';
import { useMovieDetails } from '../useMovieDetails';
import { movieApi } from '../../services/api';

// Mock the API
jest.mock('../../services/api', () => ({
  movieApi: {
    getMovieDetails: jest.fn(),
  },
}));

const mockMovieDetails = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
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
  budget: 1000000,
  genres: [{ id: 1, name: 'Action' }],
  homepage: 'https://example.com',
  imdb_id: 'tt1234567',
  production_companies: [],
  production_countries: [],
  revenue: 2000000,
  runtime: 120,
  spoken_languages: [],
  status: 'Released',
  tagline: 'Test tagline',
};

describe('useMovieDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state when movieId is null', () => {
    const { result } = renderHook(() => useMovieDetails(null));

    expect(result.current.movie).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should fetch movie details successfully', async () => {
    (movieApi.getMovieDetails as jest.Mock).mockResolvedValue(mockMovieDetails);

    const { result } = renderHook(() => useMovieDetails(1));

    expect(result.current.loading).toBe(true);
    expect(result.current.movie).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movie).toEqual(mockMovieDetails);
    expect(result.current.error).toBeNull();
    expect(movieApi.getMovieDetails).toHaveBeenCalledWith(1);
  });

  it('should handle API error', async () => {
    const errorMessage = 'Failed to fetch movie details';
    (movieApi.getMovieDetails as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useMovieDetails(1));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movie).toBeNull();
    expect(result.current.error).toBe(errorMessage);
  });

  it('should refetch when movieId changes', async () => {
    (movieApi.getMovieDetails as jest.Mock).mockResolvedValue(mockMovieDetails);

    const { result, rerender } = renderHook(
      ({ movieId }) => useMovieDetails(movieId),
      { initialProps: { movieId: 1 } }
    );

    await waitFor(() => {
      expect(result.current.movie).toEqual(mockMovieDetails);
    });

    // Change movieId
    rerender({ movieId: 2 });

    expect(result.current.loading).toBe(true);
    expect(movieApi.getMovieDetails).toHaveBeenCalledTimes(2);
    expect(movieApi.getMovieDetails).toHaveBeenLastCalledWith(2);
  });
});
