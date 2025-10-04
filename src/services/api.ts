import axios from 'axios';
import { MovieResponse, MovieDetails, SearchParams } from '../types/movie';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'your_api_key_here'; // Replace with your TMDB API key

const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const movieApi = {
  // Get popular movies
  getPopularMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await api.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  },

  // Get top rated movies
  getTopRatedMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await api.get('/movie/top_rated', {
      params: { page },
    });
    return response.data;
  },

  // Get now playing movies
  getNowPlayingMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await api.get('/movie/now_playing', {
      params: { page },
    });
    return response.data;
  },

  // Get upcoming movies
  getUpcomingMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await api.get('/movie/upcoming', {
      params: { page },
    });
    return response.data;
  },

  // Search movies
  searchMovies: async (params: SearchParams): Promise<MovieResponse> => {
    const response = await api.get('/search/movie', {
      params: {
        query: params.query,
        page: params.page || 1,
        year: params.year,
        sort_by: params.sortBy ? `${params.sortBy}.${params.sortOrder || 'desc'}` : undefined,
        with_genres: params.genre,
      },
    });
    return response.data;
  },

  // Get movie details
  getMovieDetails: async (id: number): Promise<MovieDetails> => {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  },

  // Get movie genres
  getGenres: async () => {
    const response = await api.get('/genre/movie/list');
    return response.data;
  },
};

export default api;
