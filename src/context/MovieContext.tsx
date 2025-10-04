import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Movie, MovieDetails, SearchParams } from '../types/movie';

interface MovieState {
  movies: Movie[];
  selectedMovie: MovieDetails | null;
  loading: boolean;
  error: string | null;
  searchParams: SearchParams;
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

type MovieAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_MOVIES'; payload: { movies: Movie[]; page: number; totalPages: number; totalResults: number } }
  | { type: 'SET_SELECTED_MOVIE'; payload: MovieDetails | null }
  | { type: 'SET_SEARCH_PARAMS'; payload: SearchParams }
  | { type: 'CLEAR_MOVIES' };

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
  searchParams: {},
  currentPage: 1,
  totalPages: 0,
  totalResults: 0,
};

const movieReducer = (state: MovieState, action: MovieAction): MovieState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.payload.movies,
        currentPage: action.payload.page,
        totalPages: action.payload.totalPages,
        totalResults: action.payload.totalResults,
        loading: false,
        error: null,
      };
    case 'SET_SELECTED_MOVIE':
      return { ...state, selectedMovie: action.payload };
    case 'SET_SEARCH_PARAMS':
      return { ...state, searchParams: action.payload };
    case 'CLEAR_MOVIES':
      return { ...state, movies: [], currentPage: 1, totalPages: 0, totalResults: 0 };
    default:
      return state;
  }
};

interface MovieContextType {
  state: MovieState;
  dispatch: React.Dispatch<MovieAction>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};
