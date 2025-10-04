export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const IMAGE_SIZES = {
  POSTER: 'w500',
  BACKDROP: 'w1280',
  THUMBNAIL: 'w200',
} as const;

export const ROUTES = {
  HOME: '/',
  POPULAR: '/popular',
  TOP_RATED: '/top-rated',
  NOW_PLAYING: '/now-playing',
  UPCOMING: '/upcoming',
  SEARCH: '/search',
  MOVIE_DETAILS: '/movie/:id',
} as const;

export const DEFAULT_SEARCH_PARAMS = {
  page: 1,
  sortBy: 'popularity' as const,
  sortOrder: 'desc' as const,
};
