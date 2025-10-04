import { useEffect, useCallback } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { movieApi } from '../services/api';
import { SearchParams } from '../types/movie';

export const useMovies = () => {
  const { state, dispatch } = useMovieContext();

  const fetchMovies = useCallback(async (endpoint: string, page: number = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      let response;
      switch (endpoint) {
        case 'popular':
          response = await movieApi.getPopularMovies(page);
          break;
        case 'top-rated':
          response = await movieApi.getTopRatedMovies(page);
          break;
        case 'now-playing':
          response = await movieApi.getNowPlayingMovies(page);
          break;
        case 'upcoming':
          response = await movieApi.getUpcomingMovies(page);
          break;
        default:
          throw new Error('Invalid endpoint');
      }

      dispatch({
        type: 'SET_MOVIES',
        payload: {
          movies: response.results,
          page: response.page,
          totalPages: response.total_pages,
          totalResults: response.total_results,
        },
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  }, [dispatch]);

  const searchMovies = useCallback(async (params: SearchParams) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const response = await movieApi.searchMovies(params);
      dispatch({
        type: 'SET_MOVIES',
        payload: {
          movies: response.results,
          page: response.page,
          totalPages: response.total_pages,
          totalResults: response.total_results,
        },
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  }, [dispatch]);

  const loadMoreMovies = useCallback(async (endpoint: string) => {
    if (state.currentPage >= state.totalPages || state.loading) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const nextPage = state.currentPage + 1;

      let response;
      switch (endpoint) {
        case 'popular':
          response = await movieApi.getPopularMovies(nextPage);
          break;
        case 'top-rated':
          response = await movieApi.getTopRatedMovies(nextPage);
          break;
        case 'now-playing':
          response = await movieApi.getNowPlayingMovies(nextPage);
          break;
        case 'upcoming':
          response = await movieApi.getUpcomingMovies(nextPage);
          break;
        default:
          throw new Error('Invalid endpoint');
      }

      dispatch({
        type: 'SET_MOVIES',
        payload: {
          movies: [...state.movies, ...response.results],
          page: response.page,
          totalPages: response.total_pages,
          totalResults: response.total_results,
        },
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  }, [state.currentPage, state.totalPages, state.loading, state.movies, dispatch]);

  const clearMovies = useCallback(() => {
    dispatch({ type: 'CLEAR_MOVIES' });
  }, [dispatch]);

  return {
    movies: state.movies,
    loading: state.loading,
    error: state.error,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    totalResults: state.totalResults,
    fetchMovies,
    searchMovies,
    loadMoreMovies,
    clearMovies,
  };
};
